using Software.Application.Contracts;
using Software.Domain.Dtos;
using Software.Domain.Models;
using Software.Infraestructure.Contracts;

namespace Software.Application.Services
{
    public class PaymentMethodService(IPaymentMethodRepository paymentMethodRepository) : IPaymentMethodService
    {
        private readonly IPaymentMethodRepository _paymentMethodRepository = paymentMethodRepository;

        public string Create(PaymentMethodDto dto)
        {
            if (dto == null) return "Informações inválidas";

            var entity = new PaymentMethod(dto.Description);
            _paymentMethodRepository.Create(entity);

            return "Método de pagamento criado com sucesso!";
        }

        public List<PaymentMethodDto> GetAll()
        {
            return _paymentMethodRepository.GetAll()
                .Select(x => new PaymentMethodDto
                {
                    PaymentMethodId = x.PaymentMethodId,
                    Description = x.Description
                }).ToList();
        }

        public PaymentMethodDto? GetById(int id)
        {
            var entity = _paymentMethodRepository.GetById(id);
            if (entity == null) return null;

            return new PaymentMethodDto
            {
                PaymentMethodId = entity.PaymentMethodId,
                Description = entity.Description
            };
        }

        public bool Update(int id, PaymentMethodDto dto)
        {
            var entity = _paymentMethodRepository.GetById(id);
            if (entity == null) return false;

            entity.Description = dto.Description;
            return _paymentMethodRepository.Update(entity);
        }

        public bool DeleteById(int id)
        {
            var entity = _paymentMethodRepository.GetById(id);

            if (entity == null) return false;

            return _paymentMethodRepository.Delete(entity);
        }

        public PagedListDto<PaymentMethodDto> GetPaged(int pageNumber, int pageSize, string? search = null)
        {
            return _paymentMethodRepository.GetPaged(pageNumber, pageSize, search);
        }
    }
}

