using Microsoft.EntityFrameworkCore;
using Software.Domain.Dtos;
using Software.Domain.Models;
using Software.Infraestructure.Contracts;

namespace Software.Infraestructure.Repository
{
    public class SpecialtyRepository(SoftwareContext context) : Repository(context), ISpecialtyRepository
    {
        private readonly SoftwareContext _context = context;

        public bool Create(Specialty specialty)
        {
            _context.Specialty.Add(specialty);
            SaveChanges();

            return true;
        }

        public bool Delete(Specialty specialty)
        {
            _context.Specialty.Remove(specialty);
            SaveChanges();

            return true;
        }

        public bool Update(Specialty specialty)
        {
            _context.Specialty.Update(specialty);
            SaveChanges();
            return true;
        }

        public List<Specialty> GetAll()
        {
            return _context.Specialty.AsNoTracking().ToList();
        }

        public Specialty? GetById(int id)
        {
            return _context.Specialty.AsNoTracking().FirstOrDefault(x => x.SpecialtyId == id);
        }

        public PagedListDto<SpecialtyDto> GetPaged(int pageNumber, int pageSize, string? search = null)
        {
            var query = _context.Specialty.AsNoTracking().AsQueryable();

            if (!string.IsNullOrWhiteSpace(search))
            {
                query = query.Where(s => s.Description.Contains(search));
            }

            var totalCount = query.Count();
            var totalPages = (int)Math.Ceiling(totalCount / (double)pageSize);

            var items = query
                .OrderBy(s => s.Description)
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .Select(s => new SpecialtyDto
                {
                    SpecialtyId = s.SpecialtyId,
                    Description = s.Description,
                    Name = s.Description,
                    DoctorCount = _context.Doctor.Count(d => d.SpecialtyId == s.SpecialtyId)
                })
                .ToList();

            return new PagedListDto<SpecialtyDto>
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
