using BookRating.DataAccess;
using BookRating.DTOs;
using BookRating.Services.Interfaces;

namespace BookRating.Services.Implementations
{
    public class UserService : IUserService
    {
        private readonly BookRatingDbContext _context;

        public UserService(BookRatingDbContext context)
        {
            _context = context;
        }

        public async Task<UserDetails?> GetUserDetailsById(string userId)
        {
            var user = await _context.Users.FindAsync(int.Parse(userId));
            if (user == null)
            {
                return null;
            }

            var userDetails = new UserDetails
            {
                Username = user.Username,
                Email = user.Email,
                Role = user.Role
            };
            return userDetails;
        }
    }

}
