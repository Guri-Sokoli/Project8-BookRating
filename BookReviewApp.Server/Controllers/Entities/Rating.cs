using System.ComponentModel.DataAnnotations;

namespace BookReviewApp.Server.Controllers.Entities
{
    public class Rating
    {
        [Key]
        public int Id { get; set; }

        public int Value { get; set; }

        public string? Comment { get; set; }

        public DateTime CreatedAt { get; set; }


        // Navigation 
        public int BookId { get; set; }
        public Book? Book { get; set; }


        public int UserId { get; set; }
        public User? User { get; set; }
    }
}
