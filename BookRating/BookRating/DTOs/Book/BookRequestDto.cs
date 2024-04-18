namespace BookRating.DTOs.Book
{
    public class BookRequestDto
    {
        public required string Title { get; set; }
        public int PageCount { get; set; }
        public required string Description { get; set; }
        public required int PublicationYear { get; set; }
        public required string Author { get; set; }
        public required IFormFile CoverImage { get; set; }

        public int CategoryId { get; set; } = 1;
    }
}
