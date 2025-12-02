using Software.Application.Contracts;
using Software.Domain.Dtos;
using Software.Domain.Enums;
using Software.Domain.Models;
using Software.Infraestructure.Contracts;

namespace Software.Application.Services
{
    public class PatientService(IPatientRepository patientRepository, IAuthenticationService authenticationService) : IPatientService
    {
        private readonly IPatientRepository _patientRepository = patientRepository;
        private readonly IAuthenticationService _authenticationService = authenticationService;

        public string Create(PatientDto dto)
        {
            if (dto.UserId <= 0)
            {
                if (string.IsNullOrWhiteSpace(dto.Name) ||
                    string.IsNullOrWhiteSpace(dto.LastName) ||
                    string.IsNullOrWhiteSpace(dto.Username) ||
                    string.IsNullOrWhiteSpace(dto.Email) ||
                    string.IsNullOrWhiteSpace(dto.Password) ||
                    string.IsNullOrWhiteSpace(dto.Cpf))
                {
                    return "Dados de usuário são obrigatórios para criação automática do paciente.";
                }

                var userDto = new UserDto
                {
                    Name = dto.Name,
                    LastName = dto.LastName,
                    Username = dto.Username,
                    Email = dto.Email,
                    Password = dto.Password,
                    Cpf = dto.Cpf,
                    Phone = dto.Phone,
                    BirthDate = dto.BirthDate,
                    Role = Role.Patient
                };

                var userId = _authenticationService.Create(userDto);
                if (userId == 0)
                {
                    return "Usuário já existe ou não pôde ser criado.";
                }

                dto.UserId = userId;
            }

            var entity = new Patient(dto.UserId);

            var result = _patientRepository.Create(entity);
            if (result)
                return "Paciente Criado com sucesso!";
            else
                return "Erro ao criar o paciente!";
        }

        public bool DeleteById(int id)
        {
            var entity = _patientRepository.GetPatientById(id);
            if (entity == null) return false;

            return _patientRepository.Delete(entity);
        }

        public List<PatientDto> GetAll()
        {
            return _patientRepository.GetAll()
                .Select(entity => new PatientDto()
                {
                    PatientId = entity.PatientId,
                    UserId = entity.UserId,
                    Name = entity.User != null ? entity.User.Name + " " + entity.User.LastName : null,
                    Username = entity.User?.Username,
                    Email = entity.User?.Email,
                    Cpf = entity.User?.Cpf,
                    Phone = entity.User?.Phone,
                    BirthDate = entity.User?.BirthDate
                }).ToList();
        }

        public List<PatientDto> Search(string? term = null)
        {
            return _patientRepository.Search(term)
                .Select(entity => new PatientDto()
                {
                    PatientId = entity.PatientId,
                    UserId = entity.UserId,
                    Name = entity.User != null ? entity.User.Name + " " + entity.User.LastName : null,
                    Username = entity.User?.Username,
                    Email = entity.User?.Email,
                    Cpf = entity.User?.Cpf,
                    Phone = entity.User?.Phone,
                    BirthDate = entity.User?.BirthDate
                }).ToList();
        }

        public PatientDto? GetById(int id)
        {
            var entity = _patientRepository.GetPatientById(id);
            if (entity == null) return null;

            var dto = new PatientDto()
            {
                PatientId = entity.PatientId,
                UserId = entity.UserId,
                Name = entity.User != null ? entity.User.Name + " " + entity.User.LastName : null,
                Username = entity.User?.Username,
                Email = entity.User?.Email,
                Cpf = entity.User?.Cpf,
                Phone = entity.User?.Phone,
                BirthDate = entity.User?.BirthDate
            };
            return dto;
        }

        public bool Update(int id, PatientDto dto)
        {
            var entity = _patientRepository.GetPatientById(id);
            if (entity == null) return false;

            entity.UserId = dto.UserId;

            var result = _patientRepository.Update(entity);
            return result;
        }

        public PagedListDto<PatientDto> GetPaged(int pageNumber, int pageSize, string? search = null)
        {
            return _patientRepository.GetPaged(pageNumber, pageSize, search);
        }
    }
}
