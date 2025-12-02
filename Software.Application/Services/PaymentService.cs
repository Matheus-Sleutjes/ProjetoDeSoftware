using Software.Application.Contracts;
using Software.Domain.Dtos;
using Software.Domain.Models;
using Software.Infraestructure.Contracts;

namespace Software.Application.Services
{
    public class PaymentService(IPaymentRepository paymentRepository) : IPaymentService
    {
        private readonly IPaymentRepository _paymentRepository = paymentRepository;

        public string Create(PaymentDto dto)
        {
            if (dto == null) return "Informações inválidas";

            // Garante que a data seja tratada como UTC para o PostgreSQL
            var paymentDateUtc = dto.PaymentDate.Kind == DateTimeKind.Utc
                ? dto.PaymentDate
                : DateTime.SpecifyKind(dto.PaymentDate, DateTimeKind.Utc);

            var entity = new Payment(paymentDateUtc, dto.PaymentMethodId, dto.UserId, dto.AppointmentId);
            _paymentRepository.Create(entity);

            return "Pagamento registrado com sucesso!";
        }

        public List<PaymentDto> GetAll()
        {
            return _paymentRepository.GetAll()
                .Select(p => new PaymentDto
                {
                    PaymentId = p.PaymentId,
                    PaymentDate = p.PaymentDate,
                    PaymentMethodId = p.PaymentMethodId,
                    UserId = p.UserId,
                    AppointmentId = p.AppointmentId,
                    PaymentMethodDescription = p.PaymentMethod?.Description,
                    UserName = p.User != null ? $"{p.User.Name} {p.User.LastName}" : null,
                    AppointmentDate = p.Appointment?.AppointmentDate,
                    PatientName = p.Appointment?.Patient?.User != null 
                        ? $"{p.Appointment.Patient.User.Name} {p.Appointment.Patient.User.LastName}" 
                        : null,
                    DoctorName = p.Appointment?.Doctor?.User != null 
                        ? $"{p.Appointment.Doctor.User.Name} {p.Appointment.Doctor.User.LastName}" 
                        : null
                }).ToList();
        }

        public PaymentDto? GetById(int id)
        {
            var entity = _paymentRepository.GetById(id);
            if (entity == null) return null;

            return new PaymentDto
            {
                PaymentId = entity.PaymentId,
                PaymentDate = entity.PaymentDate,
                PaymentMethodId = entity.PaymentMethodId,
                UserId = entity.UserId,
                AppointmentId = entity.AppointmentId,
                PaymentMethodDescription = entity.PaymentMethod?.Description,
                UserName = entity.User != null ? $"{entity.User.Name} {entity.User.LastName}" : null,
                AppointmentDate = entity.Appointment?.AppointmentDate,
                PatientName = entity.Appointment?.Patient?.User != null 
                    ? $"{entity.Appointment.Patient.User.Name} {entity.Appointment.Patient.User.LastName}" 
                    : null,
                DoctorName = entity.Appointment?.Doctor?.User != null 
                    ? $"{entity.Appointment.Doctor.User.Name} {entity.Appointment.Doctor.User.LastName}" 
                    : null
            };
        }

        public bool Update(int id, PaymentDto dto)
        {
            var entity = _paymentRepository.GetById(id);
            if (entity == null) return false;

            // Garante que a data seja tratada como UTC para o PostgreSQL
            entity.PaymentDate = dto.PaymentDate.Kind == DateTimeKind.Utc
                ? dto.PaymentDate
                : DateTime.SpecifyKind(dto.PaymentDate, DateTimeKind.Utc);
            entity.PaymentMethodId = dto.PaymentMethodId;
            entity.UserId = dto.UserId;
            entity.AppointmentId = dto.AppointmentId;

            return _paymentRepository.Update(entity);
        }

        public bool DeleteById(int id)
        {
            var entity = _paymentRepository.GetById(id);

            if (entity == null) return false;

            return _paymentRepository.Delete(entity);
        }

        public PagedListDto<PaymentDto> GetPaged(int pageNumber, int pageSize, string? search = null)
        {
            return _paymentRepository.GetPaged(pageNumber, pageSize, search);
        }
    }
}
