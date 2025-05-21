using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Software.Application.Contracts;
using Software.Domain.Dtos;

namespace Software.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SpecialtyController(ISpecialtyService specialtyService) : ControllerBase
    {
        private readonly ISpecialtyService _specialtyService = specialtyService;

        [Authorize]
        [HttpGet]
        public IActionResult Get()
        {
            var specialties = _specialtyService.GetAll();
            return Ok(specialties);
        }

        [Authorize]
        [HttpPost]
        public IActionResult Post([FromBody] SpecialtyDto dto)
        {
            if (dto == null) return BadRequest("Informações invalidas");

            var result = _specialtyService.Create(dto);
            return Ok(new { Message= result });
        }

        [Authorize]
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var result = _specialtyService.DeleteById(id);
            if (result)
                return Ok(new { Message = "Especialidade deletada com sucesso!" });
            else
                return NotFound(new { Message = "Especialidade não encontrada!" });
        }
    }
}
