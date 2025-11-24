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

            var entity = new Payment(dto.PaymentDate, dto.PaymentMethodId, dto.UserId, dto.AppointmentId);
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
                    UserName = p.User != null ? $"{p.User.Name} {p.User.LastName}" : null
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
                UserName = entity.User != null ? $"{entity.User.Name} {entity.User.LastName}" : null
            };
        }

        public bool Update(int id, PaymentDto dto)
        {
            var entity = _paymentRepository.GetById(id);
            if (entity == null) return false;

            entity.PaymentDate = dto.PaymentDate;
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
