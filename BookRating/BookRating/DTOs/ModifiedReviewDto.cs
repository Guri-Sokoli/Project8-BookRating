using System.ComponentModel.DataAnnotations;

namespace BookRating.DTOs
{
    public class ModifiedReviewDto
    {
        [Range(1, 5)]
        public double? Rating { get; set; }
        public string? Comment { get; set; }
    }
}
