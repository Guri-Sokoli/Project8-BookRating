using System.ComponentModel.DataAnnotations;

namespace BookReviewApp.Server.Controllers.Entities
{
    public class UserBook
    {
        [Key]
        public int Id { get; set; }


        //Navigation
        public int UserId { get; set; }
        public User? User { get; set; }

        public int BookId { get; set; }
        public Book? Book { get; set; }
    }
}
