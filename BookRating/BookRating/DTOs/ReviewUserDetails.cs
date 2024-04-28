using System.ComponentModel.DataAnnotations;

namespace BookRating.DTOs
{
    public class ReviewUserDetails
    {
        [Range(1, 5)]
        [Required]
        public int Rating { get; set; }
        public string? Comment { get; set; }

        public string? UserName { get; set;}
    }
}
