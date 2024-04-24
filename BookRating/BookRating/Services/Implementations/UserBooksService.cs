using BookRating.DataAccess;
using BookRating.DTOs.Book;
using BookRating.Models;
using BookRating.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

public class UserBooksService : IUserBooksService
{
    private readonly BookRatingDbContext _context;
    private readonly ILogger<UserBooksService> _logger;

    public UserBooksService(BookRatingDbContext context, ILogger<UserBooksService> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<string> AddBookToCollectionAsync(int userId, int bookId)
    {
        try
        {
            if (_context.UserBooks.Any(ub => ub.UserId == userId && ub.BookId == bookId))
            {
                _logger.LogInformation("Attempt to add duplicate book {BookId} to user {UserId} collection.", bookId, userId);
                return "Book already added to your collection.";
            }

            var userBook = new UserBook
            {
                UserId = userId,
                BookId = bookId,
                DateCreated = DateTime.UtcNow
            };

            _context.UserBooks.Add(userBook);
            await _context.SaveChangesAsync();
            _logger.LogInformation("Book {BookId} added to user {UserId} collection successfully.", bookId, userId);

            return "Book added to your collection successfully.";
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error adding book {BookId} to user {UserId} collection.", bookId, userId);
            throw new Exception("Internal Server Error. Please try again later.");
        }
    }

    public async Task<List<BookResponseDto>> GetMyBooksAsync(int userId)
    {
        try
        {
            var books = await _context.UserBooks
                .Where(ub => ub.UserId == userId)
                .Include(ub => ub.Book)
                .ThenInclude(b => b.Category)
                .Select(ub => ub.Book)
                .ToListAsync();

            _logger.LogInformation("Retrieved {Count} books for user {UserId}.", books.Count, userId);
            return books.Select(b => new BookResponseDto
            {
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
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving books for user {UserId}.", userId);
            throw new Exception("Internal Server Error. Please try again later.");
        }
    }
}
