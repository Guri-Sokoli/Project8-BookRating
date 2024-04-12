using System.ComponentModel.DataAnnotations;

namespace BookReviewApp.Server.Controllers.Entities
{
    public class User
    {
        [Key]
        public int Id { get; set; }


        public string? Username { get; set; }


        public string? PasswordHash { get; set; }


        public string? Email { get; set; }

        public DateTime? CreatedAt { get; set; }
    }
}
