using BookRating.DataAccess;
using BookRating.DTOs;
using BookRating.Models;
using BookRating.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace BookRating.Services.Implementations
{
    public class ReviewService : IReviewService
    {
        private readonly BookRatingDbContext _context;

        public ReviewService(BookRatingDbContext context)
        {
            _context = context;
        }

        public async Task<Review> CreateReview(int userId, int bookId, ReviewDto reviewDto)
        {
            var book = await _context.Books.FindAsync(bookId);
            if (book == null)
                throw new KeyNotFoundException("Book not found.");

            var existingReview = await _context.Reviews
                .FirstOrDefaultAsync(r => r.UserId == userId && r.BookId == bookId);
            if (existingReview != null)
                throw new InvalidOperationException("You have already reviewed this book.");

            var review = new Review
            {
                Rating = reviewDto.Rating.Value,
                Comment = reviewDto.Comment,
                CreatedAt = DateTime.UtcNow,
                UserId = userId,
                BookId = bookId
            };

            _context.Add(review);
            await _context.SaveChangesAsync();
            return review;
        }

        public async Task<Review> EditReview(int userId, int reviewId, ReviewDto reviewDto)
        {
            var review = await _context.Reviews.FindAsync(reviewId);
            if (review == null)
                throw new KeyNotFoundException("Review not found.");

            if (review.UserId != userId)
                throw new InvalidOperationException("You are not allowed to edit someone else's review.");

            review.Rating = reviewDto.Rating ?? review.Rating;
            review.Comment = reviewDto.Comment ?? review.Comment;

            _context.Entry(review).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return review;
        }

        public async Task<IEnumerable<object>> GetUserReviews(int userId)
        {
            return await _context.Reviews
                .Where(r => r.UserId == userId)
                .Include(r => r.Book)
                .ThenInclude(b => b.Category)
                .Select(r => new
                {
                    Rating = r.Rating,
                    Comment = r.Comment,
                    CreatedAt = r.CreatedAt,
                    BookTitle = r.Book.Title,
                    BookAuthor = r.Book.Author,
                    BookCategory = r.Book.Category.Name,
                    BookAverageRating = r.Book.RateAvg
                })
                .ToListAsync();
        }

        public async Task<object> GetReview(int reviewId)
        {
            var review = await _context.Reviews
                .Where(r => r.Id == reviewId)
                .Include(r => r.User)
                .Include(r => r.Book)
                .ThenInclude(b => b.Category)
                .Select(r => new
                {
                    ReviewId = r.Id,
                    Rating = r.Rating,
                    Comment = r.Comment,
                    CreatedAt = r.CreatedAt,
                    User = r.User.Username,
                    BookTitle = r.Book.Title,
                    BookAuthor = r.Book.Author,
                    BookCategory = r.Book.Category.Name,
                    BookAverageRating = r.Book.RateAvg
                })
                .FirstOrDefaultAsync();

            if (review == null)
                throw new KeyNotFoundException("Review not found.");

            return review;
        }

        public async Task<IEnumerable<Review>> GetAllReviews()
        {
            return await _context.Reviews.ToListAsync();
        }

        public async Task DeleteReview(int userId, int reviewId)
        {
            var review = await _context.Reviews.FindAsync(reviewId);
            if (review == null)
                throw new KeyNotFoundException("Review not found.");

            if (review.UserId != userId)
                throw new InvalidOperationException("You cannot delete someone else's review.");

            _context.Reviews.Remove(review);
            await _context.SaveChangesAsync();
        }
    }
}
