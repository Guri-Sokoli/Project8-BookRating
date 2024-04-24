using BookRating.DTOs.Category;
using BookRating.Models;

namespace BookRating.Services.Interfaces
{
    public interface ICategoriesService
    {
       
        Task<List<Category>> GetAllCategoriesAsync();
        Task<Category> GetCategoryByIdAsync(int id);
        Task<Category> CreateCategoryAsync(CategoryRequestDto categoryDto);
        Task<Category> UpdateCategoryAsync(int id, CategoryRequestDto categoryDto);
        Task<string> DeleteCategoryAsync(int id);
        

    }
}
