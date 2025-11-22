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
            var user = _context.Users.AsNoTracking()
                                     .FirstOrDefault(u => u.UserId == id && u.Role == Domain.Enums.Role.Patient);

            if (user == null) return null;

            return new Patient
            {
                PatientId = user.UserId,
                UserId = user.UserId,
                User = user
            };
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
            return _context.Users.AsNoTracking()
                                 .Where(u => u.Role == Domain.Enums.Role.Patient)
                                 .Select(u => new Patient
                                 {
                                     PatientId = u.UserId,
                                     UserId = u.UserId,
                                     User = u
                                 })
                                 .ToList();
        }

        public List<Patient> Search(string? term = null)
        {
            var query = _context.Users.AsNoTracking()
                                      .Where(u => u.Role == Domain.Enums.Role.Patient)
                                      .AsQueryable();

            if (!string.IsNullOrWhiteSpace(term))
            {
                term = term.Trim();
                query = query.Where(u =>
                    u.Name.Contains(term) ||
                    u.LastName.Contains(term) ||
                    u.Email.Contains(term) ||
                    u.Cpf.Contains(term));
            }

            return query
                .OrderBy(u => u.Name)
                .Select(u => new Patient
                {
                    PatientId = u.UserId,
                    UserId = u.UserId,
                    User = u
                })
                .ToList();
        }

        public PagedListDto<PatientDto> GetPaged(int pageNumber, int pageSize, string? search = null)
        {
            var query = _context.Users.AsNoTracking()
                                      .Where(u => u.Role == Domain.Enums.Role.Patient)
                                      .AsQueryable();

            if (!string.IsNullOrWhiteSpace(search))
            {
                query = query.Where(u => 
                    u.Name.Contains(search) ||
                    u.LastName.Contains(search) ||
                    u.Email.Contains(search) ||
                    u.Cpf.Contains(search));
            }

            var totalCount = query.Count();
            var totalPages = (int)Math.Ceiling(totalCount / (double)pageSize);

            var items = query
                .OrderBy(u => u.Name)
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .Select(u => new PatientDto
                {
                    PatientId = u.UserId,
                    UserId = u.UserId,
                    Name = u.Name + " " + u.LastName,
                    Email = u.Email,
                    Cpf = u.Cpf,
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
