﻿using Software.Domain.Dtos;

namespace Software.Application.Contracts
{
    public interface IAuthenticationService
    {
        string Create(UserDto dto);
        LoginResponse Login(string email, string password);
        UserDto? GetById(int id);
        UserDto? GetByCpf(string cpf);
        bool DeleteById(int id);
        bool Update(int id, UserDto dto);
        List<UserDto> GetAllByParameter(int roleId);
    }
}
