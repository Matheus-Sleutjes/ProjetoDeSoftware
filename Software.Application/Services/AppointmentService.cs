using Software.Application.Contracts;
using Software.Domain.Dtos;
using Software.Domain.Models;
using Software.Infraestructure.Contracts;

namespace Software.Application.Services
{
    public class AppointmentService(IAppointmentRepository appointmentRepository, IAppointmentNotificationService appointmentNotificationService) : IAppointmentService
    {
        private readonly IAppointmentRepository _appointmentRepository = appointmentRepository;
        private readonly IAppointmentNotificationService _notificationService = appointmentNotificationService;

        public async Task<string> CreateAsync(AppointmentDto dto)
        {
            var entity = new Appointment(dto.PatientId, dto.DoctorId, dto.AppointmentDate, dto.Description);

            var result = _appointmentRepository.Create(entity);
            if (!result)
                return "Erro ao criar o agendamento!";

            var savedAppointment = _appointmentRepository.GetAppointmentById(entity.AppointmentId);
            if (savedAppointment != null)
                await _notificationService.NotifyAppointmentCreatedAsync(savedAppointment);

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
            entity.AppointmentDate = dto.AppointmentDate;
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

        public PagedListDto<AppointmentDto> GetPaged(int pageNumber, int pageSize, string? search = null)
        {
            return _appointmentRepository.GetPaged(pageNumber, pageSize, search);
        }
    }
} 