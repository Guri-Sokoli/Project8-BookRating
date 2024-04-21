using BookRating.DataAccess;
using BookRating.DTOs;
using BookRating.Models;
using BookTating.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.Security.Claims;

namespace BookRating.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReviewsController : ControllerBase
    {
        private readonly BookRatingDbContext _context;
        //private readonly UserManager<User> _userManager;

        public ReviewsController(BookRatingDbContext context)
        {
            _context = context;
            // _userManager = userManager;
        }

        //POST: api/reviews/books/{bookId}
        [HttpPost("books/{bookId}")]
        [Authorize]
        public async Task<IActionResult> CreateReview(int bookId, [FromBody] ReviewDto reviewDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            //Extract user ID from the claims
            var userId = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
            if (userId == null)
            {
                return Unauthorized();
            }

            //Check if the book exists
            var book = await _context.Books.FindAsync(bookId);
            if (book == null)
            {
                return NotFound("Book not found.");
            }

            // Create and save the new review
            var review = new Review
            {
                Rating = reviewDto.Rating,
                Comment = reviewDto.Comment,
                CreatedAt = DateTime.UtcNow,
                UserId = int.Parse(userId),
                BookId = bookId
            };

            _context.Add(review);
            await _context.SaveChangesAsync();

            return Ok(review); // to be returend a 201 SC once the get by id method is implemented
        }

       
    }
}