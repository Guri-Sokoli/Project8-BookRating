using BookRating.DTOs.Book;

namespace BookRating.Services.Interfaces
{
    public interface IUserBooksService
    {
        Task<string> AddBookToCollectionAsync(int userId, int bookId);
        Task<List<BookResponseDto>> GetMyBooksAsync(int userId);
    }
}
