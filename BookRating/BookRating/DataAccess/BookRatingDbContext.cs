using BookRating.Models;
using Microsoft.EntityFrameworkCore;

namespace BookRating.DataAccess
{
    public class BookRatingDbContext : DbContext
    {
        public BookRatingDbContext(DbContextOptions<BookRatingDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Book> Books { get; set; }
        public DbSet<Review> Reviews { get; set; }

        public DbSet<UserBook> UserBooks { get; set; }
    }
}
