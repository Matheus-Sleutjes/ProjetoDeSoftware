using Software.Domain.Models;

public interface IAppointmentNotificationService
{
    Task NotifyAppointmentCreatedAsync(Appointment appointment);
}