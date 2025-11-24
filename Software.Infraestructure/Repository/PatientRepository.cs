using Microsoft.EntityFrameworkCore;
using Software.Domain.Dtos;
using Software.Domain.Models;
using Software.Infraestructure.Contracts;

namespace Software.Infraestructure.Repository
{
    public class PatientRepository(SoftwareContext context) : Repository(context), IPatientRepository
    {
        private readonly SoftwareContext _context = context;
    
        public Patient? GetPatientById(int id)
        {
            return _context.Patient.AsNoTracking()
                                   .Include(p => p.User)
                                   .FirstOrDefault(p => p.PatientId == id);
        }

        public bool Create(Patient entity)
        {
            _context.Patient.Add(entity);
            SaveChanges();
            return true;
        }

        public bool Update(Patient entity)
        {
            _context.Patient.Update(entity);
            SaveChanges();
            return true;
        }

        public bool Delete(Patient entity)
        {
            _context.Patient.Remove(entity);
            SaveChanges();
            return true;
        }

        public List<Patient> GetAll()
        {
            return _context.Patient.AsNoTracking()
                                   .Include(p => p.User)
                                   .ToList();
        }

        public List<Patient> Search(string? term = null)
        {
            var query = _context.Patient.AsNoTracking()
                                        .Include(p => p.User)
                                        .AsQueryable();

            if (!string.IsNullOrWhiteSpace(term))
            {
                term = term.Trim();
                query = query.Where(p =>
                    p.User != null && (
                        p.User.Name.Contains(term) ||
                        p.User.LastName.Contains(term) ||
                        p.User.Email.Contains(term) ||
                        p.User.Cpf.Contains(term)));
            }

            return query
                .OrderBy(p => p.User != null ? p.User.Name : "")
                .ToList();
        }

        public PagedListDto<PatientDto> GetPaged(int pageNumber, int pageSize, string? search = null)
        {
            var query = _context.Patient.AsNoTracking()
                                        .Include(p => p.User)
                                        .AsQueryable();

            if (!string.IsNullOrWhiteSpace(search))
            {
                query = query.Where(p =>
                    p.User != null && (
                        p.User.Name.Contains(search) ||
                        p.User.LastName.Contains(search) ||
                        p.User.Email.Contains(search) ||
                        p.User.Cpf.Contains(search)));
            }

            var totalCount = query.Count();
            var totalPages = (int)Math.Ceiling(totalCount / (double)pageSize);

            var items = query
                .OrderBy(p => p.User != null ? p.User.Name : "")
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .Select(p => new PatientDto
                {
                    PatientId = p.PatientId,
                    UserId = p.UserId,
                    Name = p.User != null ? p.User.Name + " " + p.User.LastName : null,
                    Email = p.User != null ? p.User.Email : null,
                    Cpf = p.User != null ? p.User.Cpf : null,
                    Phone = "",
                    BirthDate = null
                })
                .ToList();

            return new PagedListDto<PatientDto>
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
