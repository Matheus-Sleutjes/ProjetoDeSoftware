using Software.Domain.Models;

public class AppointmentNotificationService : IAppointmentNotificationService
{
    private readonly IEmailService _emailService;

    public AppointmentNotificationService(IEmailService emailService)
    {
        _emailService = emailService;
    }

    public async Task NotifyAppointmentCreatedAsync(Appointment appointment)
    {
        var patientName = appointment.Patient?.User?.GetFullName() ?? "Paciente";
        var email = appointment.Patient?.User?.Email;

        if (string.IsNullOrWhiteSpace(email))
            return;

        var subject = "Consulta agendada com sucesso";
        var message = $@"
            Olá {patientName},

            Sua consulta com o(a) médico(a) de ID {appointment.DoctorId} foi agendada para {appointment.AppointmentDate:dd/MM/yyyy HH:mm}.

            Detalhes:
            - Descrição: {appointment.Description}

            Obrigado,
            Equipe de Atendimento
        ";

        await _emailService.SendEmailAsync(email, subject, message);
    }
}
