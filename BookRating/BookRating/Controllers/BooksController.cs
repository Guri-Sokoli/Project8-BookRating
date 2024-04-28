using BookRating.DataAccess;
using BookRating.DTOs.Book;
using BookRating.Models;
using BookRating.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;


namespace BookRating.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class BooksController : ControllerBase
    {

        private readonly IBooksService _bookService;
        private readonly ILogger<BooksController> _logger;

        public BooksController(IBooksService bookService, ILogger<BooksController> logger)
        {

            
            _logger = logger;
            _bookService = bookService;
        }


        /*USE:
         * Returns all the books
         */
        
        [HttpGet]
        public async Task<IActionResult> GetBooks()
        {
            try {
                var booksResponse = await _bookService.GetAllBooksAsync();
                return Ok(new { booksResponse, isValid= true  });

            }
            catch (Exception e)
            {
                _logger.LogError("Error getting books: {Message}", e.Message);
                return StatusCode(500, "Internal server error!!! while retrieving books.");

            }
        }


        /*USE:
         * Returns a book by id
         */
        [HttpGet("{id}")]
        public async Task<IActionResult> GetBookById(int id)
        {
            try { 

                var bookResponse = await _bookService.GetBookByIdAsync(id);
                return Ok(bookResponse);
            
            }catch (Exception e)
            {
                _logger.LogError("Error getting book by ID: {Message}", e.Message);
                return StatusCode(500, "Internal server error while retrieving the book.");
            }
        }



        /*TODO:
         * Mos me lon me e shtu librin e njejte
         * return type me e ndrru
         * Me e shtu qe me pranu vetem img files
         */
        //CREATE
        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> CreateBook([FromForm] BookRequestDto request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await _bookService.CreateBookAsync(request);
            return Ok(result);

        }



        //TODO
        /*
        [HttpPut("{id}")]
        public IActionResult UpdateBook(int id, [FromForm] BookRequestDto request)
        {

            return Ok();
        }
        */




        /*USE:
         * Delete a book by id and also its cover
         *
         */
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteBook(int id)
        {

            try {
                
                
                var result = await _bookService.DeleteBookAsync(id);
                return Ok(result);

            }
            catch (Exception e)
            {
                _logger.LogError("Error deleting book: {Message}", e.Message);
                return StatusCode(500, "Internal server error while deleting the book.");
            }
        }

        [HttpGet("search")]
        public async Task<ActionResult<List<BookResponseDto>>> SearchBooks([FromQuery] string query, [FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10)
        {
            if (string.IsNullOrWhiteSpace(query))
            {
                return BadRequest("Search query cannot be empty.");
            }

            try
            {
                var books = await _bookService.SearchBooksAsync(query, pageNumber, pageSize);
                if (books == null || books.Count == 0)
                {
                    return NotFound("No books found matching your criteria.");
                }
                return Ok(books);
            }
            catch (System.Exception ex)
            {
                return StatusCode(500, "An error occurred while processing your request: " + ex.Message);
            }
        }

        [HttpGet("most-popular")]
        public async Task<IActionResult> GetMostPopularBooks()
        {
            var books = await _bookService.GetMostPopularBooksAsync();
            return Ok(books);
        }

        // GET: api/books/recommended
        [HttpGet("recommended")]
        public async Task<IActionResult> GetRecommendedBooks()
        {
            try
            {
                var recommendedBooks = await _bookService.GetRecommendedBooksAsync();
                return Ok(recommendedBooks);
            }
            catch (Exception e)
            {
                _logger.LogError("Error getting recommended books: {Message}", e.Message);
                return StatusCode(500, "Internal server error while retrieving recommended books.");
            }
        }
    }
}
