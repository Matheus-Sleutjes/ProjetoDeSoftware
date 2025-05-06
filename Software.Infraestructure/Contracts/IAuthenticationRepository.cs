using Software.Domain.Models;

namespace Software.Infraestructure.Contracts
{
    public interface IAuthenticationRepository : IRepository
    {
        User? GetByEmail(string email);
        User? GetByUsername(string username);
        bool ValidateUserExists(string email, string username);
        string Create(User user);
    }
}
