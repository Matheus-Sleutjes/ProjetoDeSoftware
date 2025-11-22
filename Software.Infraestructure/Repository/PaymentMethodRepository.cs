using Microsoft.EntityFrameworkCore;
using Software.Domain.Dtos;
using Software.Domain.Models;
using Software.Infraestructure.Contracts;

namespace Software.Infraestructure.Repository
{
    public class PaymentMethodRepository(SoftwareContext context) : Repository(context), IPaymentMethodRepository
    {
        private readonly SoftwareContext _context = context;

        public bool Create(PaymentMethod paymentMethod)
        {
            _context.PaymentMethod.Add(paymentMethod);
            SaveChanges();
            return true;
        }

        public bool Delete(PaymentMethod paymentMethod)
        {
            _context.PaymentMethod.Remove(paymentMethod);
            SaveChanges();
            return true;
        }

        public bool Update(PaymentMethod paymentMethod)
        {
            _context.PaymentMethod.Update(paymentMethod);
            SaveChanges();
            return true;
        }

        public List<PaymentMethod> GetAll()
        {
            return _context.PaymentMethod.AsNoTracking().ToList();
        }

        public PaymentMethod? GetById(int id)
        {
            return _context.PaymentMethod.AsNoTracking().FirstOrDefault(x => x.PaymentMethodId == id);
        }

        public PagedListDto<PaymentMethodDto> GetPaged(int pageNumber, int pageSize, string? search = null)
        {
            var query = _context.PaymentMethod.AsNoTracking().AsQueryable();

            if (!string.IsNullOrWhiteSpace(search))
            {
                query = query.Where(p => p.Description.Contains(search));
            }

            var totalCount = query.Count();
            var totalPages = (int)Math.Ceiling(totalCount / (double)pageSize);

            var items = query
                .OrderBy(p => p.Description)
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .Select(p => new PaymentMethodDto
                {
                    PaymentMethodId = p.PaymentMethodId,
                    Description = p.Description
                })
                .ToList();

            return new PagedListDto<PaymentMethodDto>
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




