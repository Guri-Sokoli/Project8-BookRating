using BookRating.DataAccess;
using BookRating.DTOs.Book;
using BookRating.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;


namespace BookRating.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class BooksController : ControllerBase
    {

        private readonly BookRatingDbContext _context;
        private readonly IWebHostEnvironment _environment;
        private readonly ILogger<BooksController> _logger;

        public BooksController(BookRatingDbContext bookRatingDbContext, IWebHostEnvironment webHostEnvironment, ILogger<BooksController> logger)
        {

            _context = bookRatingDbContext;
            _environment = webHostEnvironment;
            _logger = logger;
        }


        //All books are returned
        [HttpGet]
        public async Task<IActionResult> GetBook()
        {
            var books = await _context.Books
                                        .Include(b => b.Category)
                                        .ToListAsync();
            var booksDto = books.Select(b => new BookResponseDto
            {
                Title = b.Title,
                PageCount = b.PageCount,
                Description = b.Description,
                PublicationYear = b.PublicationYear,
                CoverLink = b.CoverLink,
                Author = b.Author,
                CategoryId = b.CategoryId,
                ISBN = b.ISBN,
                RateAvg = b.RateAvg,
                Category = b.Category != null ? b.Category.Name : null
            }).ToList();

            return Ok(booksDto);
        }


        //Return book by ID
        [HttpGet("{id}")]
        public async Task<IActionResult> GetBookById([FromQuery]int id)
        {
            BookResponseDto bookDto;
            var books = await _context.Books
                                        .Include(b => b.Category)
                                        .ToListAsync();
            if (books == null)
            {
                return NotFound("The libray is empty");
            }

            var bookById = books.FirstOrDefault(b => b.Id == id);
            if (bookById == null)
            {
                return NotFound("This book does not exist!");
            }
            else
            {
                bookDto = new BookResponseDto
                {
                    Title = bookById.Title,
                    PageCount = bookById.PageCount,
                    Description = bookById.Description,
                    PublicationYear = bookById.PublicationYear,
                    CoverLink = bookById.CoverLink,
                    Author = bookById.Author,
                    CategoryId = bookById.CategoryId,
                    ISBN = bookById.ISBN,
                    RateAvg = bookById.RateAvg, 
                    Category = bookById.Category != null ? bookById.Category.Name : null

                };

            }

            return Ok(bookDto);
        }



        /*TODO:
         * Mos me lon me e shtu librin e njejte
         * return type me e ndrru
         * Me e shtu qe me pranu vetem img files
         */
        //CREATE
        [HttpPost]
        public async Task<IActionResult> CreateBook([FromForm] BookRequestDto request)
        {
            if (!ModelState.IsValid)
            {
                _logger.LogError("CreateBook: Invalid model state!");
                return BadRequest(ModelState);
            }

            _logger.LogInformation("Creating a new book with title: {Title}", request.Title);

            var book = new Book
            {
                Title = request.Title,
                PageCount = request.PageCount,
                Description = request.Description,
                PublicationYear = request.PublicationYear,
                CategoryId = request.CategoryId,
                ISBN = request.ISBN,  
                CoverLink = "//////",
                Author = request.Author,

            };

            if (request.CoverImage != null && request.CoverImage.Length > 0)
            {

                var fileName = Guid.NewGuid().ToString() + Path.GetExtension(request.CoverImage.FileName);
                var directoryPath = Path.Combine(_environment.WebRootPath, "uploads", "cover");

                // Ensure the directory path exists
                Directory.CreateDirectory(directoryPath);

                var filePath = Path.Combine(directoryPath, fileName);

                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    await request.CoverImage.CopyToAsync(fileStream);
                    book.CoverLink = Path.Combine("uploads", "cover", fileName);
                }

                _logger.LogInformation("Cover image saved to {FilePath}", filePath);

            }


            _context.Books.Add(book);
            await _context.SaveChangesAsync();

            _logger.LogInformation("Book created successfully with ID: {BookId}", book.Id);


            return Ok("The book is created successfully.");
        }



        //TODO
        [HttpPut("{id}")]
        public IActionResult UpdateBook(int id, [FromForm] BookRequestDto request)
        {

            return Ok();
        }




        /*USE:
         * Delete a book by id and also its cover
         *
         */
        [HttpDelete("{id}")]
        public IActionResult DeleteBook(int id)
        {

            var book = _context.Books.FirstOrDefault(x => x.Id == id);
            if (book == null)
            {
                return NotFound("This book does not exist!");
            }

            var filePath = Path.Combine(_environment.WebRootPath, book.CoverLink);
            if (System.IO.File.Exists(filePath))
            {
                try
                {
                    System.IO.File.Delete(filePath);

                }
                catch (Exception e)
                {
                    _logger.LogError("Error deleting file: {FilePath}. Exception: {ExceptionMessage}", filePath, e.Message);
                    return StatusCode(StatusCodes.Status500InternalServerError, "Error deleting associated file.");
                }
            }


            _context.Books.Remove(book);
            _context.SaveChanges();


            return Ok("Book deleted sucessfull!");
        }

    }
}
