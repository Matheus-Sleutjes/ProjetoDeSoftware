using Microsoft.AspNetCore.Mvc;

namespace Software.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthenticationController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get() {
            return Ok("Hello World");
        }
       
    }
}
