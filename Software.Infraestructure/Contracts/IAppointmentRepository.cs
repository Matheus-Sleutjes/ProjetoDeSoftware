using Software.Domain.Models;

namespace Software.Infraestructure.Contracts
{
    public interface IAppointmentRepository : IRepository
    {
        Appointment? GetAppointmentById(int id);
        List<Appointment> GetAll();
        List<Appointment> GetByPatientId(int patientId);
        List<Appointment> GetByDoctorId(int doctorId);
        bool Create(Appointment entity);
        bool Update(Appointment entity);
        bool Delete(Appointment entity);
    }
} 