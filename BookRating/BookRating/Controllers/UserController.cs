using BookRating.DataAccess;
using BookRating.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace BookRating.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly BookRatingDbContext _context;

        public UserController(BookRatingDbContext context)
        {
            _context = context;
        }

        [HttpGet("details"), Authorize]
        public async Task<IActionResult> GetUserDetails()
        {
            var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier);
            if (userIdClaim == null)
            {
                return Unauthorized(new { message = "Invalid token." });
            }

            var user = await _context.Users.FindAsync(int.Parse(userIdClaim.Value));
            if (user == null)
            {
                return NotFound(new { message = "User not found." });
            }

            var userDetails = new UserDetails
            {
                Username = user.Username,
                Email = user.Email,
                Role = user.Role
            };
            return Ok(userDetails);
        }
    }
}
