using BookRating.DataAccess;
using BookRating.DTOs.Category;
using BookRating.Models;
using BookRating.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

public class CategoriesService : ICategoriesService
{
    private readonly BookRatingDbContext _dbContext;
    private readonly ILogger<CategoriesService> _logger;

    public CategoriesService(BookRatingDbContext dbContext, ILogger<CategoriesService> logger)
    {
        _dbContext = dbContext;
        _logger = logger;
    }

    public async Task<List<Category>> GetAllCategoriesAsync()
    {
        return await _dbContext.Categories.ToListAsync();
    }

    public async Task<Category> GetCategoryByIdAsync(int id)
    {
        return await _dbContext.Categories.FirstOrDefaultAsync(c => c.Id == id);
    }

    public async Task<Category> CreateCategoryAsync(CategoryRequestDto categoryDto)
    {
        var category = new Category { Name = categoryDto.Name };
        _dbContext.Categories.Add(category);
        await _dbContext.SaveChangesAsync();
        return category;
    }

    public async Task<Category> UpdateCategoryAsync(int id, CategoryRequestDto categoryDto)
    {
        var category = await _dbContext.Categories.FirstOrDefaultAsync(c => c.Id == id);
        if (category == null)
        {
            _logger.LogWarning("Attempted to update non-existing category with ID {Id}.", id);
            return null;
        }

        category.Name = categoryDto.Name;
        await _dbContext.SaveChangesAsync();
        return category;
    }

    public async Task<string> DeleteCategoryAsync(int id)
    {
        var category = await _dbContext.Categories.FindAsync(id);
        if (category == null)
        {
            _logger.LogWarning("Attempted to delete non-existing category with ID {Id}.", id);
            return "Category not found.";
        }

        _dbContext.Categories.Remove(category);
        await _dbContext.SaveChangesAsync();
        return "The category was successfully deleted!";
    }
}
