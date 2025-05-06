using Microsoft.EntityFrameworkCore;
using Software.Domain.Models;
using Software.Infraestructure.Contracts;

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
    }
}