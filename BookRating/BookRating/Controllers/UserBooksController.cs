using BookRating.DataAccess;
using BookRating.DTOs.Book;
using BookRating.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using BookRating.DTOs;

namespace BookRating.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserBooksController : ControllerBase
    {


        private BookRatingDbContext _context;

        public UserBooksController(BookRatingDbContext bookRatingDbContext) { 
            
            _context = bookRatingDbContext;
        }

        [HttpPost("Add")]
        [Authorize(Roles = "User,Admin")]
        public async Task<IActionResult> AddBookToCollection([FromBody] int bookId)
        {
            var userId = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized("User is not authenticated.");
            }

            if (_context.UserBooks.Any(ub => ub.UserId == int.Parse(userId) && ub.BookId == bookId))
            {
                return BadRequest("Book already added to your collection.");
            }

            if (!int.TryParse(userId, out int userIdInt))
            {
                return BadRequest("Invalid user ID.");
            }

            var userBook = new UserBook
            {
                UserId = userIdInt,
                BookId = bookId,
                DateCreated = DateTime.UtcNow
            };

            _context.UserBooks.Add(userBook);
            await _context.SaveChangesAsync();

            return Ok("Book added to your collection successfully.");
        }





        // GET: api/UserBooks/MyBooks
        [HttpGet("MyBooks")]
        [Authorize(Roles = "User,Admin")]
        public async Task<ActionResult> GetMyBooks()
        {
            var userId = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized("User is not authenticated.");
            }

            var books = await _context.UserBooks
                .Where(ub => ub.UserId == int.Parse(userId))
                .Include(ub => ub.Book)
                .ThenInclude(b => b.Category)
                .Select(ub => ub.Book)
                .ToListAsync();

            var booksDto = books.Select(b => new BookResponseDto
            {
                Title = b.Title,
                PageCount = b.PageCount,
                Description = b.Description,
                PublicationYear = b.PublicationYear,
                CoverLink = b.CoverLink,
                Author = b.Author,
                RateAvg = b.RateAvg,
                ISBN = b.ISBN,
                Category = (b.Category != null) ? b.Category.Name : null



            }).ToList();

            return Ok(booksDto);
        }



    }
}
