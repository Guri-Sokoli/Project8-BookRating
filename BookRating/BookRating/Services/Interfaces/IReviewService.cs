using BookRating.DTOs;
using BookRating.Models;

namespace BookRating.Services.Interfaces
{
    public interface IReviewService
    {
        Task<Review> CreateReview(int userId, int bookId, ReviewDto reviewDto);
        Task<Review> EditReview(int userId, int reviewId, ModifiedReviewDto reviewDto);
        Task<IEnumerable<Review>> GetUserReviews(int userId);
        Task<object> GetReview(int reviewId);
        Task<IEnumerable<Review>> GetAllReviews();
        Task DeleteReview(int userId, int reviewId);

        Task<IEnumerable<ReviewUserDetails>> GetBookReviewsAsync(int bookid);
    }

}
