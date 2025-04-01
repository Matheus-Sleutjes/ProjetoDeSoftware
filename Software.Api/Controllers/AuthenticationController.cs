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
        public IActionResult Get() {
            return Ok("Hello World");
        }
       
    }
}
