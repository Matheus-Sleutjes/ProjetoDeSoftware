using Microsoft.EntityFrameworkCore;
using Software.Domain.Dtos;
using Software.Domain.Models;
using Software.Infraestructure.Contracts;

namespace Software.Infraestructure.Repository
{
    public class PaymentRepository(SoftwareContext context) : Repository(context), IPaymentRepository
    {
        private readonly SoftwareContext _context = context;

        public bool Create(Payment payment)
        {
            _context.Payment.Add(payment);
            SaveChanges();
            return true;
        }

        public bool Delete(Payment payment)
        {
            _context.Payment.Remove(payment);
            SaveChanges();
            return true;
        }

        public bool Update(Payment payment)
        {
            _context.Payment.Update(payment);
            SaveChanges();
            return true;
        }

        public List<Payment> GetAll()
        {
            return _context.Payment
                .Include(p => p.PaymentMethod)
                .Include(p => p.User)
                .AsNoTracking()
                .ToList();
        }

        public Payment? GetById(int id)
        {
            return _context.Payment
                .Include(p => p.PaymentMethod)
                .Include(p => p.User)
                .AsNoTracking()
                .FirstOrDefault(x => x.PaymentId == id);
        }

        public PagedListDto<PaymentDto> GetPaged(int pageNumber, int pageSize, string? search = null)
        {
            var query = _context.Payment
                .Include(p => p.PaymentMethod)
                .Include(p => p.User)
                .AsNoTracking()
                .AsQueryable();

            if (!string.IsNullOrWhiteSpace(search))
            {
                query = query.Where(p =>
                    (p.PaymentMethod != null && p.PaymentMethod.Description.Contains(search)) ||
                    (p.User != null && (p.User.Name + " " + p.User.LastName).Contains(search)));
            }

            var totalCount = query.Count();
            var totalPages = (int)Math.Ceiling(totalCount / (double)pageSize);

            var items = query
                .OrderByDescending(p => p.PaymentDate)
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .Select(p => new PaymentDto
                {
                    PaymentId = p.PaymentId,
                    PaymentDate = p.PaymentDate,
                    PaymentMethodId = p.PaymentMethodId,
                    UserId = p.UserId,
                    AppointmentId = p.AppointmentId,
                    PaymentMethodDescription = p.PaymentMethod != null ? p.PaymentMethod.Description : string.Empty,
                    UserName = p.User != null ? (p.User.Name + " " + p.User.LastName) : string.Empty
                })
                .ToList();

            return new PagedListDto<PaymentDto>
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




