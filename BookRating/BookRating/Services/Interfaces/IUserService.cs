using BookRating.DTOs;

namespace BookRating.Services.Interfaces
{
    public interface IUserService
    {
        Task<UserDetails?> GetUserDetailsById(string userId);
    }

}
