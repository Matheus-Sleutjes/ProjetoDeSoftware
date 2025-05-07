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
        public IActionResult Create([FromBody] UserDto dto)
        {
            if (dto == null) return BadRequest("Informações invalidas");

            var response = _authenticationService.Create(dto);

            return Ok(response);
        }

        [HttpPost]
        public IActionResult Login([FromBody] UserDto dto)
        {
            if (dto == null) return BadRequest("Informações invalidas");

            var response = _authenticationService.Login(dto.Email, dto.Password);

            return Ok(response);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var user = _authenticationService.GetById(id);
            return Ok(user);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteById(int id)
        {
            var isSuccess = _authenticationService.DeleteById(id);

            if (isSuccess)
                return Ok();
            else
                return NotFound("User não encontrado.");
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] UserDto dto)
        {
            var isSuccess = _authenticationService.Update(id, dto);

            if (isSuccess)
                return Ok("Atualizado com sucesso!");
            else
                return BadRequest("Algo deu errado!");
        }
    }
}
