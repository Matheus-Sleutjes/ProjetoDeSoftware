using Software.Domain.Dtos;

namespace Software.Application.Contracts
{
    public interface IAppointmentService
    {
        List<AppointmentDto> GetAll();
        AppointmentDto? GetById(int id);
        Task<string> CreateAsync(AppointmentDto dto);
        bool Update(int id, AppointmentDto dto);
        bool DeleteById(int id);
        List<AppointmentDto> GetByPatientId(int patientId);
        List<AppointmentDto> GetByDoctorId(int doctorId);
    }
} 