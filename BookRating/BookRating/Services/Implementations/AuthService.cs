using BookRating.DataAccess;
using BookRating.DTOs;
using BookRating.Models;
using BookRating.Services.Interfaces;
using BookTating.DTOs;
using Microsoft.EntityFrameworkCore;

namespace BookRating.Services.Implementations
{
    public class AuthService : IAuthService
    {
        private readonly BookRatingDbContext _context;
        private readonly ITokenService _tokenService;

        public AuthService(BookRatingDbContext context, ITokenService tokenService)
        {
            _context = context;
            _tokenService = tokenService;
        }

        public async Task<string> RegisterUser(UserRegistration newUser, string role)
        {
            var userExists = await _context.Users.AnyAsync(u => u.Username == newUser.Username);
            if (userExists)
            {
                throw new Exception("Username already exists");
            }

            var emailExists = await _context.Users.AnyAsync(u => u.Email == newUser.Email);
            if (emailExists)
            {
                throw new Exception("A user with this email already exists");
            }

            string passwordHash = BCrypt.Net.BCrypt.HashPassword(newUser.Password);

            var user = new User
            {
                Username = newUser.Username,
                Email = newUser.Email,
                PasswordHash = passwordHash,
                Role = role
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return _tokenService.CreateToken(user);
        }

        public async Task<string> LoginUser(UserLogIn userLogin)
        {
            var userExist = await _context.Users.SingleOrDefaultAsync(u => u.Username == userLogin.Username);

            if (userExist == null || !BCrypt.Net.BCrypt.Verify(userLogin.Password, userExist.PasswordHash))
            {
                throw new Exception("Invalid username or password.");
            }

            return _tokenService.CreateToken(userExist);
        }
    }

}
