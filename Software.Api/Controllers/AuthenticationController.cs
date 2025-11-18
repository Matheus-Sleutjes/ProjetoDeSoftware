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
            if (dto == null) return BadRequest(new { Message = "Informa��es invalidas" });

            var userId = _authenticationService.Create(dto);
            
            if (userId == 0)
                return BadRequest(new { Message = "Usuário já existe" });

            return Ok(new { Message = "Usuário criado com sucesso", UserId = userId });
        }

        [HttpPost("Login")]
        public IActionResult Login([FromBody] UserDto dto)
        {
            var response = _authenticationService.Login(dto.Email, dto.Password);

            return Ok(response);
        }

        [Authorize]
        [HttpPost("Pagination")]
        public IActionResult Pagination([FromBody] PaginationDto pagination)
        {
            if (pagination == null)
                return BadRequest(new { Message = "Parâmetros de paginação inválidos" });

            var result = _authenticationService.GetPaged(
                pagination.PageNumber, 
                pagination.PageSize, 
                pagination.Search);

            return Ok(result);
        }

        [Authorize]
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var user = _authenticationService.GetById(id);
            if (user == null)
                return NotFound(new { Message = "Usuário não encontrado!" });
            return Ok(user);
        }

        //[Authorize]
        //[HttpGet("GetByCpf")]
        //public IActionResult GetById([FromQuery] string cpf)
        //{
        //    var user = _authenticationService.GetByCpf(cpf);
        //    return Ok(user);
        //}

        //[Authorize]
        //[HttpGet("GetAllByParameter")]
        //public IActionResult GetAllByParameter([FromQuery]int roleId)
        //{
        //    var users = _authenticationService.GetAllByParameter(roleId);
        //    return Ok(users);
        //}

        [Authorize]
        [HttpDelete("{id}")]
        public IActionResult DeleteById(int id)
        {
            var isSuccess = _authenticationService.DeleteById(id);

            if (isSuccess)
                return Ok(new { Message = "Usuario deletado com sucesso!" });
            else
                return NotFound(new { Message = "User n�o encontrado!" });
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
