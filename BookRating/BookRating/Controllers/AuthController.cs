using BookRating.DataAccess;
using BookRating.DTOs;
using BookRating.Models;
using BookRating.Services;
using BookTating.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.ComponentModel.DataAnnotations;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace BookRating.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    
    public class AuthController : ControllerBase
    {
        private readonly BookRatingDbContext _context;
        private readonly TokenService _tokenService;
        public AuthController(BookRatingDbContext context, TokenService tokenService)
        {
            _context = context;
            _tokenService = tokenService;
        }

        [HttpPost("register/admin")]
        public async Task<IActionResult> RegisterAdmin([FromBody] UserRegistration newUser)
        {
            if (ModelState.IsValid)
            {
                var userExists = await _context.Users.AnyAsync(u => u.Username == newUser.Username);
                if (userExists)
                {
                    return BadRequest(new { message = "Username already exists" });
                }

                string passwordHash = BCrypt.Net.BCrypt.HashPassword(newUser.Password);

                var user = new User
                {
                    Username = newUser.Username,
                    Email = newUser.Email,
                    PasswordHash = passwordHash,
                    Role = "Admin"
                };

                _context.Users.Add(user);
                await _context.SaveChangesAsync();

                return Ok(user);
            }

            return BadRequest(ModelState);
        }

        [HttpPost("register/user")]
        public async Task<IActionResult> RegisterUser([FromBody] UserRegistration newUser)
        {
            if (ModelState.IsValid)
            {
                var userExists = await _context.Users.AnyAsync(u => u.Username == newUser.Username);
                if (userExists)
                {
                    return BadRequest(new { message = "Username already exists" });
                }

                string passwordHash = BCrypt.Net.BCrypt.HashPassword(newUser.Password);

                var user = new User
                {
                    Username = newUser.Username,
                    Email = newUser.Email,
                    PasswordHash = passwordHash,
                    Role = "User"
                };

                _context.Users.Add(user);
                await _context.SaveChangesAsync();

                return Ok(user);
            }

            return BadRequest(ModelState);
        }

        [HttpPost("login")]
        public async Task<IActionResult> LogIn([FromBody] UserLogIn user)
        {
            if(ModelState.IsValid)
            {
                var userExist = await _context.Users.SingleOrDefaultAsync(u => u.Username == user.Username);

                if (userExist == null){ 
                    return BadRequest(new { message = "This user doesn't exist." }); 
                }

                if (!BCrypt.Net.BCrypt.Verify(user.Password, userExist.PasswordHash)) {
                    return BadRequest(new { message = "Wrong Password." });
                }

                string token = _tokenService.CreateToken(userExist);
                return Ok(token);
            }
            return BadRequest(ModelState);
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
