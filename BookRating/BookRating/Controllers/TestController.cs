using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BookRating.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestController : ControllerBase
    {
        [HttpGet("hello"), Authorize]
        public ActionResult GetHello()
        {
            return Ok("Hello");
        }

        [HttpGet("Hi")]
        public ActionResult GetHi()
        {
            return Ok("Hi");
        }

        [HttpGet("Name")]
        [Authorize(Roles = "Admin")]
        public ActionResult GetName()
        {
            return Ok("Sara");
        }
    }
}
