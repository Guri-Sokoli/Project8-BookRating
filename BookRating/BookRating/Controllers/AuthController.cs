﻿using BookRating.DataAccess;
using BookRating.DTOs;
using BookRating.Models;
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
        private readonly IConfiguration _configuration;
        public AuthController(BookRatingDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
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

                string passwordHash = BCrypt.Net.BCrypt.HashPassword(newUser.Password);

                var user = new User
                {
                    Username = newUser.Username,
                    Email = newUser.Email,
                    PasswordHash = passwordHash,
                    //Role = Role.User.ToRoleString()
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

                string token = CreateToken(userExist);
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

    private string CreateToken(User user)
        {
            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Role, user.Role)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
                _configuration.GetSection("AppSettings:SecretKey").Value!));

            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                    claims: claims,
                    expires: DateTime.Now.AddDays(1),
                    signingCredentials: credentials
                    );

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return jwt;
        }

    }
}
