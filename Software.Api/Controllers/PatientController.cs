using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Software.Application.Contracts;
using Software.Domain.Dtos;

namespace Software.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PatientController(IPatientService patientService) : ControllerBase
    {
        private readonly IPatientService _patientService = patientService;

        [Authorize]
        [HttpGet]
        public IActionResult Get()
        {
            var patients = _patientService.GetAll();
            return Ok(patients);
        }

        [Authorize]
        [HttpGet("search")]
        public IActionResult Search([FromQuery] string? term = null)
        {
            var patients = _patientService.Search(term);
            return Ok(patients);
        }

        [Authorize]
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var patient = _patientService.GetById(id);
            if (patient == null)
                return NotFound(new { Message = "Paciente não encontrado!" });
            return Ok(patient);
        }

        [Authorize]
        [HttpPost("Pagination")]
        public IActionResult Pagination([FromBody] PaginationDto pagination)
        {
            if (pagination == null)
                return BadRequest(new { Message = "Parâmetros de paginação inválidos" });

            var result = _patientService.GetPaged(
                pagination.PageNumber,
                pagination.PageSize,
                pagination.Search);

            return Ok(result);
        }

        [Authorize]
        [HttpPost]
        public IActionResult Post([FromBody] PatientDto dto)
        {
            if (dto == null) return BadRequest(new { Message = "Informações invalidas" });

            var response = _patientService.Create(dto);
            return Ok(new { Message = response });
        }

        [Authorize]
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] PatientDto dto)
        {
            var isSuccess = _patientService.Update(id, dto);

            if (isSuccess)
                return Ok(new { Message = "Atualizado com sucesso!" });
            else
                return BadRequest(new { Message = "Algo deu errado!" });
        }

        [Authorize]
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var isSuccess = _patientService.DeleteById(id);

            if (isSuccess)
                return Ok(new { Message = "Paciente deletado com sucesso!" });
            else
                return NotFound(new { Message = "Paciente não encontrado!" });
        }

    }
}
