using BookRating.DataAccess;
using BookRating.DTOs.Book;
using BookRating.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using BookRating.DTOs;
using BookRating.Services.Interfaces;

namespace BookRating.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserBooksController : ControllerBase
    {


        private readonly IUserBooksService _userBookService;
        private readonly ILogger<UserBooksController> _logger;

        public UserBooksController(IUserBooksService userBookService, ILogger<UserBooksController> logger)
        {
            _userBookService = userBookService;
            _logger = logger;
        }

        [HttpPost("Add")]
        [Authorize(Roles = "User,Admin")]
        public async Task<IActionResult> AddBookToCollection([FromBody] int bookId)
        {
            var userId = User.Claims.FirstOrDefault(c => c.Type is ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId) || !int.TryParse(userId, out int userIdInt))
            {
                _logger.LogWarning("User ID is invalid or not authenticated.");
                return Unauthorized(new { vlera = "User is not authenticated." , isValid = false });
            }

            try
            {
                var result = await _userBookService.AddBookToCollectionAsync(userIdInt, bookId);
                return result.Contains("successfully") ? Ok(result) : BadRequest(result);
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Failed to add book {BookId} to user {UserId} collection.", bookId, userIdInt);
                return StatusCode(500, "Internal server error while adding the book.");
            }
        }

        [HttpGet("MyBooks")]
        [Authorize(Roles = "User,Admin")]
        public async Task<ActionResult> GetMyBooks()
        {
            var userId = User.Claims.FirstOrDefault(c => c.Type is ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId) || !int.TryParse(userId, out int userIdInt))
            {
                _logger.LogWarning("User ID is invalid or not authenticated.");
                return Unauthorized("User is not authenticated.");
            }

            try
            {
                var booksDto = await _userBookService.GetMyBooksAsync(userIdInt);
                return Ok(booksDto);
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Failed to retrieve books for user {UserId}.", userIdInt);
                return StatusCode(500, "Internal server error while retrieving books.");
            }
        }
    }

}
