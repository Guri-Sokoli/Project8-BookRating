using BookRating.DataAccess;
using BookRating.DTOs;
using BookRating.Models;
using BookRating.Services.Interfaces;
using BookTating.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.ComponentModel.DataAnnotations;
using System.Security.Claims;

namespace BookRating.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReviewsController : ControllerBase
    {
        private readonly IReviewService _reviewService;

        public ReviewsController(IReviewService reviewService)
        {
            _reviewService = reviewService;
        }

        [HttpPost("books/{bookId}")]
        [Authorize]
        public async Task<IActionResult> CreateReview(int bookId, [FromBody] ReviewDto reviewDto)
        {
            try
            {
                var userId = int.Parse(User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value);
                var review = await _reviewService.CreateReview(userId, bookId, reviewDto);
                return CreatedAtAction(nameof(GetReview), new { id = review.Id }, review);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> EditReview(int id, [FromBody] ReviewDto modifiedReview)
        {
            try
            {
                var userId = int.Parse(User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value);
                var review = await _reviewService.EditReview(userId, id, modifiedReview);
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("my-reviews")]
        [Authorize]
        public async Task<IActionResult> GetUserReviews()
        {
            try
            {
                var userId = int.Parse(User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value);
                var reviews = await _reviewService.GetUserReviews(userId);
                return Ok(reviews);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetReviews()
        {
            var reviews = await _reviewService.GetAllReviews();
            return Ok(reviews);
        }

        [HttpGet("{id}")]
        [Authorize]
        public async Task<IActionResult> GetReview(int id)
        {
            try
            {
                var review = await _reviewService.GetReview(id);
                return Ok(review);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteReview(int id)
        {
            try
            {
                var userId = int.Parse(User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value);
                await _reviewService.DeleteReview(userId, id);
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }

}

