using BookRating.DTOs.Category;
using BookRating.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("/api/[controller]")]
public class CategoriesController : ControllerBase
{
    private readonly ICategoriesService _categoryService;

    public CategoriesController(ICategoriesService categoryService)
    {
        _categoryService = categoryService;
    }

    [HttpGet]
    [Authorize(Roles = "User,Admin")]
    public async Task<IActionResult> GetCategory()
    {
        var categories = await _categoryService.GetAllCategoriesAsync();
        return Ok(categories);
    }

    [HttpGet("{id}")]
    [Authorize(Roles = "User,Admin")]
    public async Task<IActionResult> GetCategoryById(int id)
    {
        var category = await _categoryService.GetCategoryByIdAsync(id);
        if (category == null)
        {
            return NotFound("Category not found.");
        }
        return Ok(category);
    }

    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> CreateCategory([FromBody] CategoryRequestDto category)
    {
        var createdCategory = await _categoryService.CreateCategoryAsync(category);
        return Ok(createdCategory);
    }

    [HttpPut("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> UpdateCategory(int id, [FromBody] CategoryRequestDto request)
    {
        var updatedCategory = await _categoryService.UpdateCategoryAsync(id, request);
        if (updatedCategory == null)
        {
            return NotFound("That category does not exist!");
        }
        return Ok(updatedCategory);
    }


    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> DeleteCategory(int id)
    {
        var result = await _categoryService.DeleteCategoryAsync(id);
        if (result == "Category not found.")
        {
            return NotFound(result);
        }
        return Ok(result);
    }
}
