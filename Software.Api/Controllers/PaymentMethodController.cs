using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Software.Application.Contracts;
using Software.Domain.Dtos;

namespace Software.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PaymentMethodController(IPaymentMethodService paymentMethodService) : ControllerBase
    {
        private readonly IPaymentMethodService _paymentMethodService = paymentMethodService;

        [Authorize]
        [HttpGet]
        public IActionResult Get()
        {
            var methods = _paymentMethodService.GetAll();
            return Ok(methods);
        }

        [Authorize]
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var method = _paymentMethodService.GetById(id);
            if (method == null)
                return NotFound(new { Message = "Método de pagamento não encontrado!" });

            return Ok(method);
        }

        [Authorize]
        [HttpPost]
        public IActionResult Post([FromBody] PaymentMethodDto dto)
        {
            if (dto == null) return BadRequest("Informações inválidas");

            var result = _paymentMethodService.Create(dto);
            return Ok(new { Message = result });
        }

        [Authorize]
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] PaymentMethodDto dto)
        {
            var isSuccess = _paymentMethodService.Update(id, dto);

            if (isSuccess)
                return Ok(new { Message = "Método de pagamento atualizado com sucesso!" });
            else
                return NotFound(new { Message = "Método de pagamento não encontrado!" });
        }

        [Authorize]
        [HttpPost("Pagination")]
        public IActionResult Pagination([FromBody] PaginationDto pagination)
        {
            if (pagination == null)
                return BadRequest(new { Message = "Parâmetros de paginação inválidos" });

            var result = _paymentMethodService.GetPaged(
                pagination.PageNumber,
                pagination.PageSize,
                pagination.Search);

            return Ok(result);
        }

        [Authorize]
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var result = _paymentMethodService.DeleteById(id);
            if (result)
                return Ok(new { Message = "Método de pagamento deletado com sucesso!" });
            else
                return NotFound(new { Message = "Método de pagamento não encontrado!" });
        }
    }
}





