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
        Task<List<BookResponseDto>> SearchBooksAsync(string searchText, int pageNumber = 1, int pageSize = 10);
        Task<List<BookResponseDto>> GetMostPopularBooksAsync();
        Task<List<BookResponseDto>> GetRecommendedBooksAsync();

    }
}
