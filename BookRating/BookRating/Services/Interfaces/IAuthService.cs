using BookRating.DTOs;
using BookTating.DTOs;

namespace BookRating.Services.Interfaces
{
    public interface IAuthService
    {
        Task<string> RegisterUser(UserRegistration newUser, string role);
        Task<string> LoginUser(UserLogIn userLogin);
    }

}
