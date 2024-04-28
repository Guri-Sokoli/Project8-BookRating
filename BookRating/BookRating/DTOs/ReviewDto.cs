using System.ComponentModel.DataAnnotations;

namespace BookRating.DTOs
{
    public class ReviewDto
    {
        [Range(1,5)]
        [Required]
        public int Rating { get; set; }
        public string? Comment { get; set; }
    }
}
