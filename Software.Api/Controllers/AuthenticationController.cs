using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Software.Application.Contracts;
using Software.Domain.Dtos;

namespace Software.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthenticationController(
        IAuthenticationService authenticationService,
        IPatientService patientService,
        IDoctorService doctorService) : ControllerBase
    {
        private readonly IAuthenticationService _authenticationService = authenticationService;
        private readonly IPatientService _patientService = patientService;
        private readonly IDoctorService _doctorService = doctorService;

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
            // Valida se existe paciente ou médico vinculado ao usuário
            var hasPatient = _patientService.GetAll().Any(p => p.UserId == id);
            if (hasPatient)
            {
                return BadRequest(new { Message = "Não é possível remover o usuário, pois existe(m) paciente(s) vinculado(s)." });
            }

            var hasDoctor = _doctorService.GetAll().Any(d => d.UserId == id);
            if (hasDoctor)
            {
                return BadRequest(new { Message = "Não é possível remover o usuário, pois existe(m) médico(s) vinculado(s)." });
            }

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
