using Microsoft.EntityFrameworkCore;
using Software.Domain.Dtos;
using Software.Domain.Enums;
using Software.Domain.Models;
using Software.Infraestructure.Contracts;
using Software.Infraestructure.Migrations;

namespace Software.Infraestructure.Repository
{
    public class AuthenticationRepository(SoftwareContext context) : Repository(context), IAuthenticationRepository
    {
        private readonly SoftwareContext _context = context;

        public User? GetByEmail(string email)
        {
            var user = _context.Users.AsNoTracking()
                                     .FirstOrDefault(t => t.Email == email);
            return user;
        }

        public User? GetByUsername(string username)
        {
            var user = _context.Users.AsNoTracking()
                                     .FirstOrDefault(t => t.Username == username);
            return user;
        }

        public bool ValidateUserExists(string email, string username)
        {
            var user = _context.Users.AsNoTracking()
                                     .FirstOrDefault(t => t.Email == email || t.Username == username);
            return user != null;
        }

        public int Create(User user)
        {
            _context.Users.Add(user);
            _context.SaveChanges();
            return user.UserId;
        }

        public User? GetById(int id)
        {
            return _context.Users.AsNoTracking()
                                 .FirstOrDefault(t => t.UserId == id);
        }

        public void Delete(User user)
        {
            _context.Users.Remove(user);
            _context.SaveChanges();
        }

        public void Update(User user)
        {
            _context.Users.Update(user);
            _context.SaveChanges();
        }

        public List<UserDto> GetAllByParameter(int roleId)
        {
            return _context.Users.AsNoTracking().Where(t => (roleId == 0 ? true : t.Role == (Role)roleId))
                                 .Select(t => new UserDto
                                 {
                                     UserId = t.UserId,
                                     Name = t.Name,
                                     LastName = t.LastName,
                                     Username = t.Username,
                                     Email = t.Email,
                                     Role = t.Role,
                                     Cpf = t.Cpf
                                 })
                                 .ToList();
        }

        public User? GetByCpf(string cpf)
        {
            var user = _context.Users.AsNoTracking()
                                     .FirstOrDefault(t => t.Cpf == cpf);
            return user;
        }

        public PagedListDto<UserDto> GetPaged(int pageNumber, int pageSize, string? search = null)
        {
            var query = _context.Users.AsNoTracking().AsQueryable();

            // Aplicar filtro de busca se fornecido
            if (!string.IsNullOrWhiteSpace(search))
            {
                query = query.Where(u => 
                    u.Name.Contains(search) || 
                    u.LastName.Contains(search) || 
                    u.Email.Contains(search) || 
                    u.Username.Contains(search) ||
                    u.Cpf.Contains(search));
            }

            var totalCount = query.Count();
            var totalPages = (int)Math.Ceiling(totalCount / (double)pageSize);

            var items = query
                .OrderBy(u => u.Name)
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .Select(t => new UserDto
                {
                    UserId = t.UserId,
                    Name = t.Name +" "+t.LastName,
                    LastName = t.LastName,
                    Username = t.Username,
                    Email = t.Email,
                    Role = t.Role,
                    Cpf = t.Cpf
                })
                .ToList();

            return new PagedListDto<UserDto>
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