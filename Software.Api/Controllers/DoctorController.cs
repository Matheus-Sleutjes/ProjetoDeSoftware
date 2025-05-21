using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Software.Application.Contracts;
using Software.Domain.Dtos;

namespace Software.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DoctorController(IDoctorService doctorService) : ControllerBase
    {
        private readonly IDoctorService _doctorService = doctorService;
        
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
            return Ok(doctor);
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
            var isSuccess = _doctorService.DeleteById(id);

            if (isSuccess)
                return Ok(new { Message = "Doutor deletado com sucesso!" });
            else
                return NotFound(new { Message = "Doutor não encontrado!" });
        }

    }
}
