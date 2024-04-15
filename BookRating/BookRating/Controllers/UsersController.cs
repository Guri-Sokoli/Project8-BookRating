using BookRating.DataAccess;
using BookRating.Models;
using BookTating.DTOs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace BookRating.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    
    public class UsersController : ControllerBase
    {
        private readonly BookRatingDbContext _context;
        //private readonly IPasswordHasher<User> _passwordHasher;

        public UsersController(BookRatingDbContext context)
        {
            _context = context;
            //_passwordHasher = passwordHasher;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserRegistration newUser)
        {
            if (ModelState.IsValid)
            {
                var userExists = await _context.Users.AnyAsync(u => u.Username == newUser.Username);
                if (userExists)
                {
                    return BadRequest(new { message = "Username already exists" });
                }

                var user = new User
                {
                    Username = newUser.Username,
                    Email = newUser.Email,
                    PasswordHash = newUser.Password
                };

                //user.PasswordHash = _passwordHasher.HashPassword(user, newUser.Password);

                _context.Users.Add(user);
                await _context.SaveChangesAsync();

                return Ok(new { message = "User registered successfully" });
            }

            return BadRequest(ModelState);
        }
    }
}
