using Microsoft.IdentityModel.Tokens;
using Software.Application.Contracts;
using Software.Domain.Dtos;
using Software.Domain.Enums;
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

        public int Create(UserDto dto)
        {
            var Exists = _authenticationRepository.ValidateUserExists(dto.Email, dto.Username);
            if (Exists) return 0;

            if (!IsValidCpf(dto.Cpf))
                return 0;

            var user = new User(dto.Name, dto.LastName, dto.Username, dto.Email, ConvertStringToBase64(dto.Password), dto.Cpf);

            user.Role = dto.Role == 0 ? Role.Patient : dto.Role;
            user.Phone = dto.Phone;
            
            if (dto.BirthDate.HasValue)
            {
                user.BirthDate = dto.BirthDate.Value.Kind == DateTimeKind.Utc
                    ? dto.BirthDate.Value
                    : DateTime.SpecifyKind(dto.BirthDate.Value, DateTimeKind.Utc);
            }

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
                UserId = user.UserId,
                Name = user.Name,
                LastName = user.LastName,
                Username = user.Username,
                Email = user.Email,
                Role = user.Role,
                Cpf = user.Cpf,
                Phone = user.Phone,
                BirthDate = user.BirthDate
            };
            return dto;
        }

        public UserDto? GetByCpf(string cpf)
        {
            var user = _authenticationRepository.GetByCpf(cpf);
            if (user == null) return null;
            var dto = new UserDto
            {
                UserId = user.UserId,
                Name = user.Name,
                LastName = user.LastName,
                Username = user.Username,
                Email = user.Email,
                Role = user.Role,
                Cpf = user.Cpf,
                Phone = user.Phone,
                BirthDate = user.BirthDate
            };
            return dto;
        }

        public UserDto? GetByEmail(string email)
        {
            var user = _authenticationRepository.GetByEmail(email);
            if (user == null) return null;
            var dto = new UserDto
            {
                UserId = user.UserId,
                Name = user.Name,
                LastName = user.LastName,
                Username = user.Username,
                Email = user.Email,
                Role = user.Role,
                Cpf = user.Cpf,
                Phone = user.Phone,
                BirthDate = user.BirthDate
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

            user.Name = string.IsNullOrWhiteSpace(dto.Name) ? user.Name : dto.Name;
            user.LastName = string.IsNullOrWhiteSpace(dto.LastName) ? user.LastName : dto.LastName;
            user.Username = string.IsNullOrWhiteSpace(dto.Username) ? user.Username : dto.Username;
            user.Email = string.IsNullOrWhiteSpace(dto.Email) ? user.Email : dto.Email;

            if (dto.Role != 0)
            {
                user.Role = dto.Role;
            }

            user.Cpf = string.IsNullOrWhiteSpace(dto.Cpf) ? user.Cpf : dto.Cpf;
            user.Phone = string.IsNullOrWhiteSpace(dto.Phone) ? user.Phone : dto.Phone;
            
            if (dto.BirthDate.HasValue)
            {
                user.BirthDate = dto.BirthDate.Value.Kind == DateTimeKind.Utc
                    ? dto.BirthDate.Value
                    : DateTime.SpecifyKind(dto.BirthDate.Value, DateTimeKind.Utc);
            }

            _authenticationRepository.Update(user);
            return true;
        }

        public List<UserDto> GetAllByParameter(int roleId)
        {
            return _authenticationRepository.GetAllByParameter(roleId);
        }

        public PagedListDto<UserDto> GetPaged(int pageNumber, int pageSize, string? search = null)
        {
            return _authenticationRepository.GetPaged(pageNumber, pageSize, search);
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

        private bool IsValidCpf(string cpf)
        {
            if (string.IsNullOrWhiteSpace(cpf))
                return false;

            cpf = cpf.Replace(".", "").Replace("-", "");

            if (cpf.Length != 11)
                return false;

            if (!cpf.All(char.IsDigit))
                return false;

            if (cpf.Distinct().Count() == 1)
                return false;

            int[] multiplier1 = new int[9] { 10, 9, 8, 7, 6, 5, 4, 3, 2 };
            int[] multiplier2 = new int[10] { 11, 10, 9, 8, 7, 6, 5, 4, 3, 2 };

            string tempCpf = cpf.Substring(0, 9);
            int sum = 0;

            for (int i = 0; i < 9; i++)
                sum += int.Parse(tempCpf[i].ToString()) * multiplier1[i];

            int remainder = sum % 11;
            if (remainder < 2)
                remainder = 0;
            else
                remainder = 11 - remainder;

            string digit = remainder.ToString();
            tempCpf = tempCpf + digit;
            sum = 0;

            for (int i = 0; i < 10; i++)
                sum += int.Parse(tempCpf[i].ToString()) * multiplier2[i];

            remainder = sum % 11;
            if (remainder < 2)
                remainder = 0;
            else
                remainder = 11 - remainder;

            digit = digit + remainder.ToString();

            return cpf.EndsWith(digit);
        }

    }
}
