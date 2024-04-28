using BookRating.Controllers;
using BookRating.DataAccess;
using BookRating.DTOs.Book;
using BookRating.Models;
using BookRating.Services.Interfaces;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;

namespace BookRating.Services.Implementations
{
    public class BooksService : IBooksService
    {
        private readonly BookRatingDbContext _context;
        private readonly IWebHostEnvironment _environment;
        private readonly ILogger<BooksController> _logger;

        public BooksService(BookRatingDbContext bookRatingDbContext, IWebHostEnvironment webHostEnvironment, ILogger<BooksController> logger) {
            _context = bookRatingDbContext;
            _environment = webHostEnvironment;
            _logger = logger;

        }


        public async Task<List<BookResponseDto>> GetAllBooksAsync() {

            var books = await _context.Books
                                        .Include(b => b.Category)
                                        .ToListAsync();
            var booksDto = books.Select(b => new BookResponseDto
            {
                Id = b.Id,
                Title = b.Title,
                PageCount = b.PageCount,
                Description = b.Description,
                PublicationYear = b.PublicationYear,
                CoverLink = b.CoverLink,
                Author = b.Author,
                ISBN = b.ISBN,
                RateAvg = b.RateAvg,
                Category = b.Category != null ? b.Category.Name : null
            }).ToList();

            return booksDto;

        }



        public async Task<BookResponseDto> GetBookByIdAsync(int id) {
            BookResponseDto bookDto;
            var books = await _context.Books
                                        .Include(b => b.Category)
                                        .ToListAsync();
            if (books == null)
            {
                throw new Exception("The libray is empty");
            }

            var bookById = books.FirstOrDefault(b => b.Id == id);
            if (bookById == null)
            {
                throw new Exception("This book does not exist!");
            }
            
            bookDto = new BookResponseDto
            {
                Id = bookById.Id,   
                Title = bookById.Title,
                PageCount = bookById.PageCount,
                Description = bookById.Description,
                PublicationYear = bookById.PublicationYear,
                CoverLink = bookById.CoverLink,
                Author = bookById.Author,

                ISBN = bookById.ISBN,
                RateAvg = bookById.RateAvg,
                Category = bookById.Category != null ? bookById.Category.Name : null

            };

            

            return bookDto;
        }


        public async Task<string> CreateBookAsync(BookRequestDto bookRequest) {

            

            _logger.LogInformation("Creating a new book with title: {Title}", bookRequest.Title);

            if (BookExists(bookRequest.ISBN)) {
                return "This book already exist!";
            }

            var book = new Book
            {
                Title = bookRequest.Title,
                PageCount = bookRequest.PageCount,
                Description = bookRequest.Description,
                PublicationYear = bookRequest.PublicationYear,
                CategoryId = bookRequest.CategoryId,
                ISBN = bookRequest.ISBN,
                CoverLink = "//////",
                Author = bookRequest.Author,

            };

            if (bookRequest.CoverImage != null && bookRequest.CoverImage.Length > 0)
            {
                var allowedExtensions = new[] { ".jpg", ".jpeg", ".png" };
                var fileExtension = Path.GetExtension(bookRequest.CoverImage.FileName).ToLower();

                if (!allowedExtensions.Contains(fileExtension))
                {
                    return "Invalid image format. Only JPG and PNG files are accepted.";
                }

                var fileName = Guid.NewGuid().ToString() + fileExtension;
                var directoryPath = Path.Combine(_environment.WebRootPath, "uploads", "cover");

                // To make sure the directory path exists
                Directory.CreateDirectory(directoryPath);

                var filePath = Path.Combine(directoryPath, fileName);

                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    await bookRequest.CoverImage.CopyToAsync(fileStream);
                    book.CoverLink = Path.Combine("uploads", "cover", fileName);
                }

                _logger.LogInformation("Cover image saved to {FilePath}", filePath);

            }


            _context.Books.Add(book);
            await _context.SaveChangesAsync();

            _logger.LogInformation("Book created successfully with ID: {BookId}", book.Id);

            return $"The book with ID {book.Id} is created successfully.";

        }


        
        public async Task<string> DeleteBookAsync(int id)
        {
            var book = _context.Books.FirstOrDefault(x => x.Id == id);
            if (book == null)
            {
                throw new Exception("This book does not exist!");
            }

            var filePath = Path.Combine(_environment.WebRootPath, book.CoverLink);
            if (System.IO.File.Exists(filePath))
            {
                try
                {
                    _logger.LogInformation("Starting file deletion for {FilePath}", filePath);
                    System.IO.File.Delete(filePath);
                    _logger.LogInformation("File deleted successfully for {FilePath}", filePath);
                }
                catch (UnauthorizedAccessException e)
                {
                    _logger.LogError("Unauthorized access while deleting file: {FilePath}. Exception: {ExceptionMessage}", filePath, e.Message);
                    // Handle or rethrow as necessary
                    throw;
                }
                catch (Exception e)
                {
                    _logger.LogError("Error deleting file: {FilePath}. Exception: {ExceptionMessage}", filePath, e.Message);
                    throw new Exception("Error deleting associated file.");
                }
            }

            _logger.LogInformation("Removing book record for {BookId}", book.Id);
            _context.Books.Remove(book);
            await _context.SaveChangesAsync();
            _logger.LogInformation("Book record deleted successfully for {BookId}", book.Id);

            return $"The book with ID {book.Id} is deleted successfully.";
        }

        /*
        public async Task<List<BookResponseDto>> SearchBooksAsync(string title, string author)
        {
            var books = await _context.Books
                .Where(b => b.Title.Contains(title) || b.Author.Contains(author))
                .ToListAsync();

            var booksDto = books.Select(b => new BookResponseDto
            {
                Id = b.Id,
                Title = b.Title,
                PageCount = b.PageCount,
                Description = b.Description,
                PublicationYear = b.PublicationYear,
                CoverLink = b.CoverLink,
                Author = b.Author,
                ISBN = b.ISBN,
                RateAvg = b.RateAvg,
                Category = b.Category != null ? b.Category.Name : null
            }).ToList();

            return booksDto;
        }
        */

        public async Task<List<BookResponseDto>> SearchBooksAsync(string searchText, int pageNumber = 1, int pageSize = 10)
        {
            if (string.IsNullOrWhiteSpace(searchText))
                return new List<BookResponseDto>();  // Return an empty list if search text is empty or whitespace

            // Normalize search text for consistent comparison
            var normalizedSearchText = searchText.Trim().ToLowerInvariant();

            var query = _context.Books
                
                .Where(b => b.Title.ToLower().Contains(normalizedSearchText) || b.Author.ToLower().Contains(normalizedSearchText))
                .OrderBy(b => b.Title)  // Optionally, sort by title or any other relevant field
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize);

            var books = await query.ToListAsync();

            return books.Select(b => new BookResponseDto
            {
                Id = b.Id,
                Title = b.Title,
                PageCount = b.PageCount,
                Description = b.Description,
                PublicationYear = b.PublicationYear,
                CoverLink = b.CoverLink,
                Author = b.Author,
                ISBN = b.ISBN,
                RateAvg = b.RateAvg,
                Category = b.Category != null ? b.Category.Name : null
            }).ToList();
        }


        public async Task<List<BookResponseDto>> GetMostPopularBooksAsync()
        {
            var books = await _context.Books
                                      .OrderByDescending(b => b.RateAvg)
                                      .Take(10)
                                      .ToListAsync();

            var booksDto = books.Select(b => new BookResponseDto
            {
                Id = b.Id,  
                Title = b.Title,
                PageCount = b.PageCount,
                Description = b.Description,
                PublicationYear = b.PublicationYear,
                CoverLink = b.CoverLink,
                Author = b.Author,
                RateAvg = b.RateAvg,
                ISBN = b.ISBN,
                Category = b.Category != null ? b.Category.Name : null
            }).ToList();

            return booksDto;
        }

        public async Task<List<BookResponseDto>> GetRecommendedBooksAsync()
        {
            var recommendedBooks = await _context.Books
                .Where(b => b.RateAvg >= 4)
                .Select(b => new BookResponseDto
                {

                    Id=b.Id,
                    Title = b.Title,
                    PageCount = b.PageCount,
                    Description = b.Description,
                    PublicationYear = b.PublicationYear,
                    CoverLink = b.CoverLink,
                    Author = b.Author,
                    RateAvg = b.RateAvg,
                    ISBN = b.ISBN,
                    Category = b.Category != null ? b.Category.Name : null
                })
                .ToListAsync();

            return recommendedBooks;
        }

        //HELPER METHOD
        private bool BookExists(string isbn) {

            return _context.Books.Any(b => b.ISBN == (isbn));
        }


        









    }
}
