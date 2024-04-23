using BookRating.DataAccess;
using BookRating.DTOs;
using BookRating.Services.Interfaces;
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
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet("details"), Authorize]
        public async Task<IActionResult> GetUserDetails()
        {
            var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier);
            if (userIdClaim == null)
            {
                return Unauthorized(new { message = "Invalid token." });
            }

            var userDetails = await _userService.GetUserDetailsById(userIdClaim.Value);
            if (userDetails == null)
            {
                return NotFound(new { message = "User not found." });
            }

            return Ok(userDetails);
        }
    }

}
