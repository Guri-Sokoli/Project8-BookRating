using BookRating.DTOs;
using BookRating.DTOs.Book;
using BookRating.Models;
using Microsoft.AspNetCore.Mvc;

namespace BookRating.Services.Interfaces
{
    public interface IBooksService
    {
        Task<List<BookResponseDto>> GetAllBooksAsync();
        Task<BookResponseDto> GetBookByIdAsync(int id);
        Task<string> CreateBookAsync(BookRequestDto bookRequest);

        Task<string> DeleteBookAsync(int id);
    }
}
