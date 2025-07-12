using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class EmailController : ControllerBase
{
    private readonly IEmailService _emailService;

    public EmailController(IEmailService emailService)
    {
        _emailService = emailService;
    }

    [HttpPost("enviar")]
    public async Task<IActionResult> Enviar([FromQuery] string para)
    {
        await _emailService.SendEmailAsync(para, "Teste de envio", "Este é um e-mail de teste via SendGrid.");
        return Ok("E-mail enviado com sucesso!");
    }
}