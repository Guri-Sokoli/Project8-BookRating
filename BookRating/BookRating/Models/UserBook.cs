using BookRating.Models;
using System;
using System.ComponentModel.DataAnnotations;

namespace BookRating.Models
{
    public class UserBook
    {
        [Key]
        public int Id { get; set; }

        public int UserId { get; set; }
        public User? User { get; set; }

        public int BookId { get; set; }
        public Book? Book { get; set; }

        
        [Required]
        [DataType(DataType.DateTime)]
        [Display(Name = "Date Created")]
        public DateTime DateCreated { get; set; } = DateTime.UtcNow; // Default to current time in UTC
    }
}
