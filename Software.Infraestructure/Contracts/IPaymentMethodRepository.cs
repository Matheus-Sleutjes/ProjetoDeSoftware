using Software.Domain.Dtos;
using Software.Domain.Models;

namespace Software.Infraestructure.Contracts
{
    public interface IPaymentMethodRepository : IRepository
    {
        bool Create(PaymentMethod paymentMethod);
        List<PaymentMethod> GetAll();
        PaymentMethod? GetById(int id);
        bool Update(PaymentMethod paymentMethod);
        bool Delete(PaymentMethod paymentMethod);
        PagedListDto<PaymentMethodDto> GetPaged(int pageNumber, int pageSize, string? search = null);
    }
}




