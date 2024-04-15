using System.ComponentModel.DataAnnotations;

namespace BookRating.Models
{
    public class Book
    {
        [Key]
        public int Id { get; set; }
        public required string Title { get; set; }
        public int PageCount { get; set; }
        public required string Description { get; set; }
        public required int PublicationYear { get; set; }
        public required string CoverLink { get; set; }
        public required string Author { get; set; }

        public int CategoryId { get; set; }
        public Category? Category { get; set; }
    }
}
