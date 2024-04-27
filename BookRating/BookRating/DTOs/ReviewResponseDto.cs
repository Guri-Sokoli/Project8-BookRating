namespace BookRating.DTOs
{
    public class ReviewResponseDto
    {
        public double Rating { get; set; }
        public string? Comment { get; set; }
        public DateTime CreatedAt { get; set; }
        public string? BookTitle { get; set; }
        public string? BookAuthor { get; set; }
        public string? BookCategory { get; set; }
        public double? BookAverageRating { get; set; }
    }
}
