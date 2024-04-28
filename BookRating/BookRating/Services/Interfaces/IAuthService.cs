using BookRating.DTOs;
using BookTating.DTOs;

namespace BookRating.Services.Interfaces
{
    public interface IAuthService
    {
        Task<(string Token, string Role)> RegisterUser(UserRegistration newUser, string role);
        Task<(string Token, string Role)> LoginUser(UserLogIn userLogin);
    }

}