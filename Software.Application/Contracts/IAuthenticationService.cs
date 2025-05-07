using Software.Domain.Dtos;

namespace Software.Application.Contracts
{
    public interface IAuthenticationService
    {
        string Create(UserDto dto);
        LoginResponse Login(string email, string password);
        UserDto? GetById(int id);
        bool DeleteById(int id);
    }
}
