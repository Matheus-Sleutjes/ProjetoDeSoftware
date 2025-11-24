using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Software.Application.Contracts;
using Software.Domain.Dtos;

namespace Software.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PaymentController(IPaymentService paymentService) : ControllerBase
    {
        private readonly IPaymentService _paymentService = paymentService;

        [Authorize]
        [HttpGet]
        public IActionResult Get()
        {
            var payments = _paymentService.GetAll();
            return Ok(payments);
        }

        [Authorize]
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var payment = _paymentService.GetById(id);
            if (payment == null)
                return NotFound(new { Message = "Pagamento não encontrado!" });

            return Ok(payment);
        }

        [Authorize]
        [HttpPost]
        public IActionResult Post([FromBody] PaymentDto dto)
        {
            if (dto == null) return BadRequest("Informações inválidas");

            var result = _paymentService.Create(dto);
            return Ok(new { Message = result });
        }

        [Authorize]
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] PaymentDto dto)
        {
            var isSuccess = _paymentService.Update(id, dto);

            if (isSuccess)
                return Ok(new { Message = "Pagamento atualizado com sucesso!" });
            else
                return NotFound(new { Message = "Pagamento não encontrado!" });
        }

        [Authorize]
        [HttpPost("Pagination")]
        public IActionResult Pagination([FromBody] PaginationDto pagination)
        {
            if (pagination == null)
                return BadRequest(new { Message = "Parâmetros de paginação inválidos" });

            var result = _paymentService.GetPaged(
                pagination.PageNumber,
                pagination.PageSize,
                pagination.Search);

            return Ok(result);
        }

        [Authorize]
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var result = _paymentService.DeleteById(id);
            if (result)
                return Ok(new { Message = "Pagamento deletado com sucesso!" });
            else
                return NotFound(new { Message = "Pagamento não encontrado!" });
        }
    }
}





