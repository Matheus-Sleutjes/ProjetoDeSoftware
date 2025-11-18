using Microsoft.EntityFrameworkCore;
using Software.Domain.Dtos;
using Software.Domain.Models;
using Software.Infraestructure.Contracts;

namespace Software.Infraestructure.Repository
{
    public class DoctorRepository(SoftwareContext context) : Repository(context), IDoctorRepository
    {
        private readonly SoftwareContext _context = context;

        public Doctor? GetDoctorById(int id)
        {
            return _context.Doctor.AsNoTracking()
                                  .Include(d => d.User)
                                  .Include(d => d.Specialty)
                                  .FirstOrDefault(x => x.DoctorId == id);
        }

        public bool Create(Doctor doctor)
        {
            _context.Doctor.Add(doctor);
            SaveChanges();
            return true;
        }

        public bool Update(Doctor doctor)
        {
            _context.Doctor.Update(doctor);
            SaveChanges();
            return true;
        }

        public bool Delete(Doctor doctor)
        {
            _context.Doctor.Remove(doctor);
            SaveChanges();
            return true;
        }

        public List<Doctor> GetAll()
        {
            return _context.Doctor.AsNoTracking()
                                  .Include(d => d.User)
                                  .Include(d => d.Specialty)
                                  .ToList();
        }

        public PagedListDto<DoctorDto> GetPaged(int pageNumber, int pageSize, string? search = null)
        {
            var query = _context.Doctor.AsNoTracking()
                                       .Include(d => d.User)
                                       .Include(d => d.Specialty)
                                       .AsQueryable();

            if (!string.IsNullOrWhiteSpace(search))
            {
                query = query.Where(d => 
                    (d.User != null && d.User.Name.Contains(search)) ||
                    (d.User != null && d.User.LastName.Contains(search)) ||
                    (d.User != null && d.User.Email.Contains(search)) ||
                    (d.User != null && d.User.Cpf.Contains(search)) ||
                    d.CRM.Contains(search) ||
                    (d.Specialty != null && d.Specialty.Description.Contains(search)));
            }

            var totalCount = query.Count();
            var totalPages = (int)Math.Ceiling(totalCount / (double)pageSize);

            var items = query
                .OrderBy(d => d.User != null ? d.User.Name : "")
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .Select(d => new DoctorDto
                {
                    DoctorId = d.DoctorId,
                    UserId = d.UserId,
                    SpecialtyId = d.SpecialtyId,
                    CRM = d.CRM,
                    Name = d.User != null ? d.User.Name + " " + d.User.LastName : "",
                    Email = d.User != null ? d.User.Email : "",
                    Phone = "",
                    SpecialtyName = d.Specialty != null ? d.Specialty.Description : ""
                })
                .ToList();

            return new PagedListDto<DoctorDto>
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
