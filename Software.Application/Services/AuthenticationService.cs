using Microsoft.IdentityModel.Tokens;
using Software.Application.Contracts;
using Software.Domain.Dtos;
using Software.Domain.Models;
using Software.Infraestructure.Contracts;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Software.Application.Services
{
    public class AuthenticationService(IAuthenticationRepository authenticationRepository) : IAuthenticationService
    {
        private readonly IAuthenticationRepository _authenticationRepository = authenticationRepository;

        public string Create(UserDto dto)
        {
            var Exists = _authenticationRepository.ValidateUserExists(dto.Email, dto.Username);
            if (Exists) return "Usuario já existe";

            var user = new User(dto.Name, dto.LastName, dto.Username, dto.Email, ConvertStringToBase64(dto.Password), dto.Cpf);

            var result = _authenticationRepository.Create(user);
            return result;
        }

        public LoginResponse Login(string email, string password)
        {
            var response = new LoginResponse();

            var user = _authenticationRepository.GetByEmail(email);
            if (user == null) return LoginError();
            
            var passwordBase64 = ConvertStringToBase64(password);
            if (!user.VerifyPassword(passwordBase64)) return LoginError();

            response.Token = GenerateToken(user);
            response.Success = true;
            response.Message = "Login realizado com sucesso";

            return response;
        }

        public UserDto? GetById(int id)
        {
            var user = _authenticationRepository.GetById(id);
            if (user == null) return null;
            var dto = new UserDto
            {
                Name = user.Name,
                LastName = user.LastName,
                Username = user.Username,
                Email = user.Email,
                Role = user.Role,
                Cpf = user.Cpf
            };
            return dto;
        }

        public UserDto? GetByCpf(string cpf)
        {
            var user = _authenticationRepository.GetByCpf(cpf);
            if (user == null) return null;
            var dto = new UserDto
            {
                Name = user.Name,
                LastName = user.LastName,
                Username = user.Username,
                Email = user.Email,
                Role = user.Role,
                Cpf = user.Cpf
            };
            return dto;
        }

        public bool DeleteById(int id)
        {
            var user = _authenticationRepository.GetById(id);
            if (user == null) return false;
            
            _authenticationRepository.Delete(user);
            return true;
        }

        public bool Update(int id, UserDto dto)
        {
            var user = _authenticationRepository.GetById(id);
            if (user == null) return false;

            user.Name = dto.Name == "" ? user.Name : dto.Name;
            user.LastName = dto.LastName == "" ? user.LastName : dto.LastName;
            user.Username = dto.Username == "" ? user.Username : dto.Username;

            _authenticationRepository.Update(user);
            return true;
        }

        public List<UserDto> GetAllByParameter(int roleId)
        {
            return _authenticationRepository.GetAllByParameter(roleId);
        }

        private string GenerateToken(User user)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Utils.JtwSecretkey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
            new Claim(JwtRegisteredClaimNames.Email, user.Email),
            new Claim(JwtRegisteredClaimNames.Name, user.GetFullName()),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new Claim(JwtRegisteredClaimNames.Acr, user.Role.ToString())
        };

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.UtcNow.AddHours(2),
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        private string ConvertStringToBase64(string password)
        {
            byte[] bytes = Encoding.UTF8.GetBytes(password);
            string base64Text = Convert.ToBase64String(bytes);
            return base64Text;
        }

        private LoginResponse LoginError()
        {
            var response = new LoginResponse();
            response.Message = "Email ou Senha incorreta";
            response.Success = false;
            return response;
        }

    }
}
