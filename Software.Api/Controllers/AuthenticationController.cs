using Microsoft.AspNetCore.Mvc;
using Software.Application.Contracts;

namespace Software.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthenticationController(IAuthenticationService authenticationService) : ControllerBase
    {
        private readonly IAuthenticationService _authenticationService = authenticationService;

        [HttpGet]
        public IActionResult GetAll() {
            return Ok("Hello World");
        }

        [HttpGet("{id}")]
        public IActionResult GetGustavo(int id)
        {
            return Ok("Hello World, Gustavo");
        }

    }
}
