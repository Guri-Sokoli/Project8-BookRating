using System.ComponentModel.DataAnnotations;

namespace BookRating.Models
{
    public class Review
    {
        [Key]
        public int Id { get; set; }
        public int Rating { get; set; }
        public string? Comment { get; set; }
        public DateTime ReviewDate { get; set; }
        
        public int UserId { get; set; }
        public required User User { get; set; }

        public int BokkId { get; set; }
        public required Book Book { get; set; }

    }
}
