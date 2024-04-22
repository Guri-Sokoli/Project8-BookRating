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

        public ReviewsController(BookRatingDbContext context)
        {
            _context = context;
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

        // PUT: api/reviews/{id}
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

        // GET: api/reviews/my-reviews
        [HttpGet("my-reviews")]
        [Authorize]
        public async Task<ActionResult<IEnumerable<Review>>> GetUserReviews()
        {
            var userIdValue = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            int userId;
            if (!int.TryParse(userIdValue, out userId))
            {
                return BadRequest("Invalid user ID");
            }

            var userReviews = await _context.Reviews
                .Where(r => r.UserId == userId)
                .Include(r => r.Book) // Include the Book related to each Review
                .ThenInclude(b => b.Category) // Include the Category of the Book
                .Select(r => new
                {
                    Rating = r.Rating,
                    Comment = r.Comment,
                    CreatedAt = r.CreatedAt,
                    BookTitle = r.Book.Title,
                    BookAuthor = r.Book.Author,
                    BookCategory = r.Book.Category.Name,
                    BookAverageRating = r.Book.RateAvg
                })
                .ToListAsync();

            return Ok(userReviews);
        }

        // GET: api/Reviews
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Review>>> GetReviews()
        {
            return await _context.Reviews.ToListAsync();
        }

        // Get api/reviews/{id}
        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<object>> GetReview(int id)
        {
            try
            {
                var review = await _context.Reviews
                    .Where(r => r.Id == id)
                    .Include(r => r.User)
                    .Include(r => r.Book)
                    .ThenInclude(b => b.Category)
                    .Select(r => new
                    {
                        ReviewId = r.Id,
                        Rating = r.Rating,
                        Comment = r.Comment,
                        CreatedAt = r.CreatedAt,
                        User = r.User.Username, 
                        BookTitle = r.Book.Title,
                        BookAuthor = r.Book.Author,
                        BookCategory = r.Book.Category.Name, 
                        BookAverageRating = r.Book.RateAvg
                    })
                    .FirstOrDefaultAsync();

                if (review == null)
                {
                    return NotFound("Review not found.");
                }

                return Ok(review);
            }
            catch (Exception ex)
            {
                // Log the exception details here to understand what went wrong
                return StatusCode(500, "An error occurred while processing your request.");
            }
        }


        // DELETE: api/Reviews/5
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteReview(int id)
        {
            var review = await _context.Reviews.FindAsync(id);
            if (review == null)
            {
                return NotFound();
            }

            // Extract user ID from the claims
            var userIdValue = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            int userId;
            if (!int.TryParse(userIdValue, out userId))
            {
                return BadRequest("Invalid user ID");
            }

            // Check if the review belongs to the current user
            if (review.UserId != userId)
            {
                return Forbid();
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