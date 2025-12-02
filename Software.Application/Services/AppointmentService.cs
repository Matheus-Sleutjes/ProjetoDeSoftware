using Software.Application.Contracts;
using Software.Domain.Dtos;
using Software.Domain.Models;
using Software.Infraestructure.Contracts;

namespace Software.Application.Services
{
    public class AppointmentService(IAppointmentRepository appointmentRepository) : IAppointmentService
    {
        private readonly IAppointmentRepository _appointmentRepository = appointmentRepository;

        public string Create(AppointmentDto dto)
        {
            var appointmentDateUtc = dto.AppointmentDate.Kind == DateTimeKind.Utc
                ? dto.AppointmentDate
                : DateTime.SpecifyKind(dto.AppointmentDate, DateTimeKind.Utc);
            
            ando var entity = new Appointment(dto.PatientId, dto.DoctorId, appointmentDateUtc, dto.Description);

            var result = _appointmentRepository.Create(entity);
            if (!result)
                return "Erro ao criar o agendamento!";

            var savedAppointment = _appointmentRepository.GetAppointmentById(entity.AppointmentId);

            return "Agendamento criado com sucesso!";
        }

        public bool DeleteById(int id)
        {
            var entity = _appointmentRepository.GetAppointmentById(id);
            if (entity == null) return false;

            return _appointmentRepository.Delete(entity);
        }

        public List<AppointmentDto> GetAll()
        {
            return _appointmentRepository.GetAll()
                .Select(entity => new AppointmentDto()
                {
                    AppointmentId = entity.AppointmentId,
                    PatientId = entity.PatientId,
                    DoctorId = entity.DoctorId,
                    AppointmentDate = entity.AppointmentDate,
                    Description = entity.Description,
                    Status = entity.Status,
                    CreatedAt = entity.CreatedAt,
                    UpdatedAt = entity.UpdatedAt
                }).ToList();
        }

        public AppointmentDto? GetById(int id)
        {
            var entity = _appointmentRepository.GetAppointmentById(id);
            if (entity == null) return null;

            var dto = new AppointmentDto()
            {
                AppointmentId = entity.AppointmentId,
                PatientId = entity.PatientId,
                DoctorId = entity.DoctorId,
                AppointmentDate = entity.AppointmentDate,
                Description = entity.Description,
                Status = entity.Status,
                CreatedAt = entity.CreatedAt,
                UpdatedAt = entity.UpdatedAt
            };
            return dto;
        }

        public bool Update(int id, AppointmentDto dto)
        {
            var entity = _appointmentRepository.GetAppointmentById(id);
            if (entity == null) return false;

            entity.PatientId = dto.PatientId;
            entity.DoctorId = dto.DoctorId;
            entity.Doctor = null;
            entity.Patient = null;
            entity.AppointmentDate = DateTime.SpecifyKind(dto.AppointmentDate, DateTimeKind.Utc);
            entity.Description = dto.Description;
            entity.Status = dto.Status;

            var result = _appointmentRepository.Update(entity);
            return result;
        }

        public List<AppointmentDto> GetByPatientId(int patientId)
        {
            return _appointmentRepository.GetByPatientId(patientId)
                .Select(entity => new AppointmentDto()
                {
                    AppointmentId = entity.AppointmentId,
                    PatientId = entity.PatientId,
                    DoctorId = entity.DoctorId,
                    AppointmentDate = entity.AppointmentDate,
                    Description = entity.Description,
                    Status = entity.Status,
                    CreatedAt = entity.CreatedAt,
                    UpdatedAt = entity.UpdatedAt
                }).ToList();
        }

        public List<AppointmentDto> GetByDoctorId(int doctorId)
        {
            return _appointmentRepository.GetByDoctorId(doctorId)
                .Select(entity => new AppointmentDto()
                {
                    AppointmentId = entity.AppointmentId,
                    PatientId = entity.PatientId,
                    DoctorId = entity.DoctorId,
                    AppointmentDate = entity.AppointmentDate,
                    Description = entity.Description,
                    Status = entity.Status,
                    CreatedAt = entity.CreatedAt,
                    UpdatedAt = entity.UpdatedAt
                }).ToList();
        }

        public List<AppointmentDto> GetAvailableForPayment()
        {
            return _appointmentRepository.GetAvailableForPayment()
                .Select(entity => new AppointmentDto()
                {
                    AppointmentId = entity.AppointmentId,
                    PatientId = entity.PatientId,
                    DoctorId = entity.DoctorId,
                    AppointmentDate = entity.AppointmentDate,
                    Description = entity.Description,
                    Status = entity.Status,
                    CreatedAt = entity.CreatedAt,
                    UpdatedAt = entity.UpdatedAt,
                    PatientName = entity.Patient != null && entity.Patient.User != null
                        ? entity.Patient.User.Name + " " + entity.Patient.User.LastName
                        : string.Empty
                }).ToList();
        }

        public PagedListDto<AppointmentDto> GetPaged(int pageNumber, int pageSize, string? search = null)
        {
            return _appointmentRepository.GetPaged(pageNumber, pageSize, search);
        }
    }
} 