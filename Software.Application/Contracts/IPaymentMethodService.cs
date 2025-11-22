using Software.Domain.Dtos;

namespace Software.Application.Contracts
{
    public interface IPaymentMethodService
    {
        List<PaymentMethodDto> GetAll();
        PaymentMethodDto? GetById(int id);
        string Create(PaymentMethodDto dto);
        bool Update(int id, PaymentMethodDto dto);
        bool DeleteById(int id);
        PagedListDto<PaymentMethodDto> GetPaged(int pageNumber, int pageSize, string? search = null);
    }
}




