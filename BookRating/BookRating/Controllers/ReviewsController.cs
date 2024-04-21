using BookRating.DataAccess;
using BookRating.DTOs;
using BookRating.Models;
using BookTating.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
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

            var existingReview = await _context.Reviews
                .FirstOrDefaultAsync(r => r.UserId == int.Parse(userId) && r.BookId == bookId);
            if (existingReview != null)
            {
                return Conflict(new { message = "You have already reviewed this book." });
            }

            // Create and save the new review
            var review = new Review
            {
                Rating = reviewDto.Rating.Value,
                Comment = reviewDto.Comment,
                CreatedAt = DateTime.UtcNow,
                UserId = int.Parse(userId),
                BookId = bookId
            };

            _context.Add(review);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetReview), new { id = review.Id }, review);
        }

        // PUT: api/review/5
        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> EditReview(int id, [FromBody] ReviewDto modifiedReview)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);  
            }

            //Retrieve the existing review from the database
            var review = await _context.Reviews.FindAsync(id);
            if (review == null)
            {
                return NotFound();
            }

            //Get the current user's ID from the claim
            //var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);

            var userIdValue = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            int userId;
            if (!int.TryParse(userIdValue, out userId))
            {
                // Handle the case where userId is not a valid integer or is null
                return BadRequest("Invalid user ID");
            }


            if (review.UserId != userId)
            {
                return Forbid(); // The user is not allowed to edit someone else's review
            }

            // Update the review properties if they are provided
            if (modifiedReview.Rating.HasValue)
            {
                review.Rating = modifiedReview.Rating.Value;
            }

            if (modifiedReview.Comment != null)
            {
                review.Comment = modifiedReview.Comment;
            }

            _context.Entry(review).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
                        
        }

        // GET: api/Reviews
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Review>>> GetReviews()
        {
            return await _context.Reviews.ToListAsync();
        }

        // GET: api/Reviews/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Review>> GetReview(int id)
        {
            var review = await _context.Reviews.FindAsync(id);

            if (review == null)
            {
                return NotFound();
            }

            return review;
        }

        // DELETE: api/Reviews/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteReview(int id)
        {
            var review = await _context.Reviews.FindAsync(id);
            if (review == null)
            {
                return NotFound();
            }

            _context.Reviews.Remove(review);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ReviewExists(int id)
        {
            return _context.Reviews.Any(e => e.Id == id);
        }
    }
}