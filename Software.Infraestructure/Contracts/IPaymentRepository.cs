using Software.Domain.Dtos;
using Software.Domain.Models;

namespace Software.Infraestructure.Contracts
{
    public interface IPaymentRepository : IRepository
    {
        bool Create(Payment payment);
        List<Payment> GetAll();
        Payment? GetById(int id);
        bool Update(Payment payment);
        bool Delete(Payment payment);
        PagedListDto<PaymentDto> GetPaged(int pageNumber, int pageSize, string? search = null);
    }
}





