using Microsoft.AspNetCore.Authorization;
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
            if (dto == null) return BadRequest(new { Message = "Informações invalidas" });

            var response = _authenticationService.Create(dto);

            return Ok(new { Message = response });
        }

        [HttpPost("Login")]
        public IActionResult Login([FromBody] UserDto dto)
        {
            var response = _authenticationService.Login(dto.Email, dto.Password);

            return Ok(response);
        }

        [Authorize]
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var user = _authenticationService.GetById(id);
            return Ok(user);
        }

        [Authorize]
        [HttpGet("GetAllByParameter")]
        public IActionResult GetAllByParameter([FromQuery]int roleId)
        {
            var users = _authenticationService.GetAllByParameter(roleId);
            return Ok(users);
        }

        [Authorize]
        [HttpDelete("{id}")]
        public IActionResult DeleteById(int id)
        {
            var isSuccess = _authenticationService.DeleteById(id);

            if (isSuccess)
                return Ok(new { Message = "Usuario deletado com sucesso!" });
            else
                return NotFound(new { Message = "User não encontrado!" });
        }

        [Authorize]
        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] UserDto dto)
        {
            var isSuccess = _authenticationService.Update(id, dto);

            if (isSuccess)
                return Ok(new { Message = "Atualizado com sucesso!" });
            else
                return BadRequest(new { Message = "Algo deu errado!" });
        }
    }
}
