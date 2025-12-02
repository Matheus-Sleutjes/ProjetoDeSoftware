using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Software.Application.Contracts;
using Software.Domain.Dtos;

namespace Software.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DoctorController(IDoctorService doctorService, IAppointmentService appointmentService) : ControllerBase
    {
        private readonly IDoctorService _doctorService = doctorService;
        private readonly IAppointmentService _appointmentService = appointmentService;
        
        [Authorize]
        [HttpGet]
        public IActionResult Get()
        {
            var doctors = _doctorService.GetAll();
            return Ok(doctors);
        }

        [Authorize]
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var doctor = _doctorService.GetById(id);
            if (doctor == null)
                return NotFound(new { Message = "Médico não encontrado!" });
            return Ok(doctor);
        }

        [Authorize]
        [HttpPost("Pagination")]
        public IActionResult Pagination([FromBody] PaginationDto pagination)
        {
            if (pagination == null)
                return BadRequest(new { Message = "Parâmetros de paginação inválidos" });

            var result = _doctorService.GetPaged(
                pagination.PageNumber,
                pagination.PageSize,
                pagination.Search);

            return Ok(result);
        }

        [Authorize]
        [HttpPost]
        public IActionResult Post([FromBody] DoctorDto dto)
        {
            if (dto == null) return BadRequest(new { Message = "Informações invalidas" });

            var response = _doctorService.Create(dto);
            return Ok(new { Message = response });
        }

        [Authorize]
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] DoctorDto dto)
        {
            var isSuccess = _doctorService.Update(id, dto);

            if (isSuccess)
                return Ok(new { Message = "Atualizado com sucesso!" });
            else
                return BadRequest(new { Message = "Algo deu errado!" });
        }

        [Authorize]
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var appointments = _appointmentService.GetByDoctorId(id);
            if (appointments.Any())
            {
                return BadRequest(new { Message = "Não é possível remover o médico, pois existe(m) agendamento(s) vinculado(s)." });
            }

            var isSuccess = _doctorService.DeleteById(id);

            if (isSuccess)
                return Ok(new { Message = "Doutor deletado com sucesso!" });
            else
                return NotFound(new { Message = "Doutor não encontrado!" });
        }

    }
}
