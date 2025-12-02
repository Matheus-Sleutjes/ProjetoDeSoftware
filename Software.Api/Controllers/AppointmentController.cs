using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Software.Application.Contracts;
using Software.Domain.Dtos;

namespace Software.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AppointmentController(IAppointmentService appointmentService, IPaymentService paymentService) : ControllerBase
    {
        private readonly IAppointmentService _appointmentService = appointmentService;
        private readonly IPaymentService _paymentService = paymentService;

        [Authorize]
        [HttpGet]
        public IActionResult Get()
        {
            var appointments = _appointmentService.GetAll();
            return Ok(appointments);
        }

        [Authorize]
        [HttpGet("available-for-payment")]
        public IActionResult GetAvailableForPayment()
        {
            var appointments = _appointmentService.GetAvailableForPayment();
            return Ok(appointments);
        }

        [Authorize]
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var appointment = _appointmentService.GetById(id);
            if (appointment == null)
                return NotFound(new { Message = "Agendamento não encontrado!" });

            return Ok(appointment);
        }

        [Authorize]
        [HttpGet("patient/{patientId}")]
        public IActionResult GetByPatientId(int patientId)
        {
            var appointments = _appointmentService.GetByPatientId(patientId);
            return Ok(appointments);
        }

        [Authorize]
        [HttpGet("doctor/{doctorId}")]
        public IActionResult GetByDoctorId(int doctorId)
        {
            var appointments = _appointmentService.GetByDoctorId(doctorId);
            return Ok(appointments);
        }

        [Authorize]
        [HttpPost("Pagination")]
        public IActionResult Pagination([FromBody] PaginationDto pagination)
        {
            if (pagination == null)
                return BadRequest(new { Message = "Parâmetros de paginação inválidos" });

            var result = _appointmentService.GetPaged(
                pagination.PageNumber,
                pagination.PageSize,
                pagination.Search);

            return Ok(result);
        }

        [Authorize]
        [HttpPost]
        public IActionResult Post([FromBody] AppointmentDto dto)
        {
            if (dto == null) return BadRequest(new { Message = "Informações inválidas" });

            var response = _appointmentService.Create(dto);
            return Ok(new { Message = response });
        }

        [Authorize]
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] AppointmentDto dto)
        {
            var isSuccess = _appointmentService.Update(id, dto);

            if (isSuccess)
                return Ok(new { Message = "Agendamento atualizado com sucesso!" });
            else
                return BadRequest(new { Message = "Agendamento não encontrado!" });
        }

        [Authorize]
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var payments = _paymentService.GetAll()
                                          .Where(p => p.AppointmentId == id)
                                          .ToList();
            if (payments.Any())
            {
                return BadRequest(new { Message = "Não é possível remover o agendamento, pois existe(m) pagamento(s) vinculado(s)." });
            }

            var isSuccess = _appointmentService.DeleteById(id);

            if (isSuccess)
                return Ok(new { Message = "Agendamento deletado com sucesso!" });
            else
                return NotFound(new { Message = "Agendamento não encontrado!" });
        }
    }
}