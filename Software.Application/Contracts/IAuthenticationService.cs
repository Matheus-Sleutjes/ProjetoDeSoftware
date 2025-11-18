using Software.Domain.Dtos;

namespace Software.Application.Contracts
{
    public interface IAuthenticationService
    {
        int Create(UserDto dto);
        LoginResponse Login(string email, string password);
        UserDto? GetById(int id);
        UserDto? GetByCpf(string cpf);
        bool DeleteById(int id);
        bool Update(int id, UserDto dto);
        List<UserDto> GetAllByParameter(int roleId);
        PagedListDto<UserDto> GetPaged(int pageNumber, int pageSize, string? search = null);
    }
}
