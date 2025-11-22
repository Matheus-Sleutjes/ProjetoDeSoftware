using Software.Domain.Dtos;

namespace Software.Application.Contracts
{
    public interface IPaymentService
    {
        List<PaymentDto> GetAll();
        PaymentDto? GetById(int id);
        string Create(PaymentDto dto);
        bool Update(int id, PaymentDto dto);
        bool DeleteById(int id);
        PagedListDto<PaymentDto> GetPaged(int pageNumber, int pageSize, string? search = null);
    }
}




