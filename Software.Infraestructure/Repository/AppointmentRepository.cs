using Microsoft.EntityFrameworkCore;
using Software.Domain.Models;
using Software.Infraestructure.Contracts;

namespace Software.Infraestructure.Repository
{
    public class AppointmentRepository(SoftwareContext context) : Repository(context), IAppointmentRepository
    {
        private readonly SoftwareContext _context = context;

        public Appointment? GetAppointmentById(int id)
        {
            return _context.Appointment.AsNoTracking()
                                      .Include(a => a.Patient)
                                      .Include(a => a.Doctor)
                                      .FirstOrDefault(x => x.AppointmentId == id);
        }

        public bool Create(Appointment entity)
        {
            _context.Appointment.Add(entity);
            SaveChanges();
            return true;
        }

        public bool Update(Appointment entity)
        {
            entity.UpdatedAt = DateTime.Now;
            _context.Appointment.Update(entity);
            SaveChanges();
            return true;
        }

        public bool Delete(Appointment entity)
        {
            _context.Appointment.Remove(entity);
            SaveChanges();
            return true;
        }

        public List<Appointment> GetAll()
        {
            return _context.Appointment.AsNoTracking()
                                      .Include(a => a.Patient)
                                      .Include(a => a.Doctor)
                                      .OrderByDescending(a => a.AppointmentDate)
                                      .ToList();
        }

        public List<Appointment> GetByPatientId(int patientId)
        {
            return _context.Appointment.AsNoTracking()
                                      .Include(a => a.Patient)
                                      .Include(a => a.Doctor)
                                      .Where(a => a.PatientId == patientId)
                                      .OrderByDescending(a => a.AppointmentDate)
                                      .ToList();
        }

        public List<Appointment> GetByDoctorId(int doctorId)
        {
            return _context.Appointment.AsNoTracking()
                                      .Include(a => a.Patient)
                                      .Include(a => a.Doctor)
                                      .Where(a => a.DoctorId == doctorId)
                                      .OrderByDescending(a => a.AppointmentDate)
                                      .ToList();
        }
    }
} 