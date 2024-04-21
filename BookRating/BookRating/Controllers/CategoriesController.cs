using BookRating.DataAccess;
using BookRating.DTOs.Category;
using BookRating.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BookRating.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class CategoriesController : ControllerBase
    {
        private BookRatingDbContext _dbContext;
        private ILogger<CategoriesController> _logger;

        public CategoriesController(BookRatingDbContext dbContext, ILogger<CategoriesController> logger) {
            _dbContext = dbContext;
            _logger = logger;
        }

        [HttpGet]
        public async Task<IActionResult> getCategory() {

            var categories = await _dbContext.Categories.ToListAsync();

            return Ok(categories);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> getCategoryById(int id)
        {

            var category = await _dbContext.Categories.FirstOrDefaultAsync(c => c.Id == id);
            if (category == null)
            {
                return NotFound();
            }

            return Ok(category);
        }

        [HttpPost]
        public async Task<IActionResult> createCategory([FromBody] CategoryRequestDto category) {

            var categoryObj = new Category
            {
                Name = category.Name,

            };

            _dbContext.Categories.Add(categoryObj);
            _dbContext.SaveChanges();


            return Ok(categoryObj);
        }

        [HttpPut("{id}")]

        public async Task<IActionResult> updateCategory(int id, [FromBody]CategoryRequestDto request) {

            var category = await _dbContext.Categories.FirstOrDefaultAsync(c => c.Id == id);
            if (category == null)
            {
                return NotFound("That category does not exist!");
            }

            //Update
            category.Name = request.Name;

            try
            {
                _dbContext.Update(category);
                await _dbContext.SaveChangesAsync();
                _logger.LogInformation("Updated category with ID {Id}.", id);
                return Ok(category);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating category with ID {Id}.", id);
                return StatusCode(500, "An error occurred while updating the category.");
            }


            
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> deleteCategory(int id) {

            var category = _dbContext.Categories.FirstOrDefault(x => x.Id == id);
            if (category == null) {
                return NotFound();
            }

            _dbContext.Categories.Remove(category);
            _dbContext.SaveChanges();

            return Ok("The category was successfully deleted!");
        }

    }
}
