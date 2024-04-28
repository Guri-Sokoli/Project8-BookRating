using BookRating.DataAccess;
using BookRating.Models;
using BookTating.DTOs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookRating.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FeaturedController : ControllerBase
    {
        private readonly BookRatingDbContext _context;

        public enum TimeFrame
        {
            ThisYear,
            AllTime
        }

        public FeaturedController(BookRatingDbContext context)
        {
            _context = context;
        }
        public double BookRankIndex(Book book, double m = 3.5, int C = 100)
        {
           return (book.RateAvg + m*C) / C;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Book>>> GetFeaturedBooks([FromQuery] TimeFrame timeFrame, int topCount = 10)
        {
            IQueryable<Book> featuredBooksQuery;

            switch (timeFrame)
            {
                case TimeFrame.ThisYear:
                    // Filter books for this year
                    featuredBooksQuery = _context.Books.Where(b => b.PublicationYear == DateTime.Today.Year);
                    break;
                case TimeFrame.AllTime:
                default:
                    // No specific time frame, return all books
                    featuredBooksQuery = _context.Books;
                    break;
            }

            // Retrieve top 'topCount' books
            var featuredBooks = await featuredBooksQuery.OrderByDescending(b => BookRankIndex(b,3.5,100)).Take(topCount).ToListAsync();
            return Ok(featuredBooks);
        }
    }
}
