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

        public string Create(User user)
        {
            _context.Users.Add(user);
            _context.SaveChanges();
            return "Usuario criado com sucesso";
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
    }
}