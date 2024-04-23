using BookRating.Models;

namespace BookRating.Services.Interfaces
{
    public interface ITokenService
    {
        string CreateToken(User user);
    }

}
