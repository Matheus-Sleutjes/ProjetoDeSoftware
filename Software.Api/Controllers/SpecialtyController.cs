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
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var specialty = _specialtyService.GetById(id);
            if (specialty == null)
                return NotFound(new { Message = "Especialidade não encontrada!" });
            return Ok(specialty);
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
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] SpecialtyDto dto)
        {
            var isSuccess = _specialtyService.Update(id, dto);

            if (isSuccess)
                return Ok(new { Message = "Especialidade atualizada com sucesso!" });
            else
                return NotFound(new { Message = "Especialidade não encontrada!" });
        }

        [Authorize]
        [HttpPost("Pagination")]
        public IActionResult Pagination([FromBody] PaginationDto pagination)
        {
            if (pagination == null)
                return BadRequest(new { Message = "Parâmetros de paginação inválidos" });

            var result = _specialtyService.GetPaged(
                pagination.PageNumber,
                pagination.PageSize,
                pagination.Search);

            return Ok(result);
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
