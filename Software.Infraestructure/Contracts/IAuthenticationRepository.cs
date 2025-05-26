using Software.Domain.Dtos;
using Software.Domain.Models;

namespace Software.Infraestructure.Contracts
{
    public interface IAuthenticationRepository : IRepository
    {
        User? GetByEmail(string email);
        User? GetByUsername(string username);
        User? GetById(int id);
        User? GetByCpf(string cpf);
        bool ValidateUserExists(string email, string username);
        string Create(User user);
        void Delete(User user);
        void Update(User user);
        List<UserDto> GetAllByParameter(int roleId);
    }
}
