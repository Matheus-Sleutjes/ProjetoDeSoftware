using Microsoft.EntityFrameworkCore;
using Software.Domain.Dtos;
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
                                      .ThenInclude(a => a.User)
                                      .Include(a => a.Doctor)
                                      .ThenInclude(d => d.User)
                                      .Include(a => a.Doctor)
                                      .ThenInclude(d => d.Specialty)
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
            entity.UpdatedAt = DateTime.UtcNow;
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
                                      .ThenInclude(p => p.User)
                                      .Include(a => a.Doctor)
                                      .ThenInclude(d => d.User)
                                      .Include(a => a.Doctor)
                                      .ThenInclude(d => d.Specialty)
                                      .OrderByDescending(a => a.AppointmentDate)
                                      .ToList();
        }

        public List<Appointment> GetByPatientId(int patientId)
        {
            return _context.Appointment.AsNoTracking()
                                      .Include(a => a.Patient)
                                      .ThenInclude(p => p.User)
                                      .Include(a => a.Doctor)
                                      .ThenInclude(d => d.User)
                                      .Include(a => a.Doctor)
                                      .ThenInclude(d => d.Specialty)
                                      .Where(a => a.PatientId == patientId)
                                      .OrderByDescending(a => a.AppointmentDate)
                                      .ToList();
        }

        public List<Appointment> GetByDoctorId(int doctorId)
        {
            return _context.Appointment.AsNoTracking()
                                      .Include(a => a.Patient)
                                      .ThenInclude(p => p.User)
                                      .Include(a => a.Doctor)
                                      .ThenInclude(d => d.User)
                                      .Include(a => a.Doctor)
                                      .ThenInclude(d => d.Specialty)
                                      .Where(a => a.DoctorId == doctorId)
                                      .OrderByDescending(a => a.AppointmentDate)
                                      .ToList();
        }

        public List<Appointment> GetAvailableForPayment()
        {
            var paidAppointmentIds = _context.Payment
                .Select(p => p.AppointmentId)
                .Distinct()
                .ToList();

            return _context.Appointment.AsNoTracking()
                                      .Include(a => a.Patient)
                                      .ThenInclude(p => p.User)
                                      .Where(a => !paidAppointmentIds.Contains(a.AppointmentId))
                                      .OrderBy(a => a.AppointmentDate)
                                      .ToList();
        }

        public PagedListDto<AppointmentDto> GetPaged(int pageNumber, int pageSize, string? search = null)
        {
            var query = _context.Appointment.AsNoTracking()
                                           .Include(a => a.Patient)
                                           .ThenInclude(p => p.User)
                                           .Include(a => a.Doctor)
                                           .ThenInclude(d => d.User)
                                           .Include(a => a.Doctor)
                                           .ThenInclude(d => d.Specialty)
                                           .AsQueryable();

            if (!string.IsNullOrWhiteSpace(search))
            {
                query = query.Where(a => 
                    (a.Patient != null && a.Patient.User != null && a.Patient.User.Name.Contains(search)) ||
                    (a.Patient != null && a.Patient.User != null && a.Patient.User.LastName.Contains(search)) ||
                    (a.Patient != null && a.Patient.User != null && a.Patient.User.Email.Contains(search)) ||
                    (a.Doctor != null && a.Doctor.User != null && a.Doctor.User.Name.Contains(search)) ||
                    (a.Doctor != null && a.Doctor.User != null && a.Doctor.User.LastName.Contains(search)) ||
                    (a.Doctor != null && a.Doctor.CRM.Contains(search)) ||
                    (a.Doctor != null && a.Doctor.Specialty != null && a.Doctor.Specialty.Description.Contains(search)) ||
                    a.Description.Contains(search));
            }

            var totalCount = query.Count();
            var totalPages = (int)Math.Ceiling(totalCount / (double)pageSize);

            var items = query
                .OrderByDescending(a => a.AppointmentDate)
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .Select(a => new AppointmentDto
                {
                    AppointmentId = a.AppointmentId,
                    PatientId = a.PatientId,
                    DoctorId = a.DoctorId,
                    AppointmentDate = a.AppointmentDate,
                    Description = a.Description,
                    Status = a.Status,
                    CreatedAt = a.CreatedAt,
                    UpdatedAt = a.UpdatedAt,
                    PatientName = a.Patient != null && a.Patient.User != null ? a.Patient.User.Name + " " + a.Patient.User.LastName : "",
                    DoctorName = a.Doctor != null && a.Doctor.User != null ? a.Doctor.User.Name + " " + a.Doctor.User.LastName : "",
                    SpecialtyName = a.Doctor != null && a.Doctor.Specialty != null ? a.Doctor.Specialty.Description : ""
                })
                .ToList();

            return new PagedListDto<AppointmentDto>
            {
                Items = items,
                PageNumber = pageNumber,
                PageSize = pageSize,
                TotalCount = totalCount,
                TotalPages = totalPages,
                Search = search
            };
        }
    }
} 