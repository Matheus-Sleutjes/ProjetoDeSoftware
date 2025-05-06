using Microsoft.AspNetCore.Mvc;
using Software.Application.Contracts;
using Software.Domain.Dtos;

namespace Software.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthenticationController(IAuthenticationService authenticationService) : ControllerBase
    {
        private readonly IAuthenticationService _authenticationService = authenticationService;

        [HttpPost]
        public IActionResult Create([FromBody]UserDto dto)
        {
            if (dto == null) return BadRequest("Invalid data.");

            var response = _authenticationService.Create(dto);

            return Ok(response);
        }

        [HttpPost]
        public IActionResult Login([FromBody] UserDto dto)
        {
            if (dto == null) return BadRequest("Invalid data.");

            var response = _authenticationService.Login(dto.Email, dto.Password);

            return Ok(response);
        }
    }
}
