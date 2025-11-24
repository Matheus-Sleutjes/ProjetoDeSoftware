using Software.Application.Contracts;
using Software.Domain.Dtos;
using Software.Domain.Enums;
using Software.Domain.Models;
using Software.Infraestructure.Contracts;

namespace Software.Application.Services
{
    public class DoctorService(IDoctorRepository doctorRepository, IAuthenticationService authenticationService) : IDoctorService
    {
        private readonly IDoctorRepository _doctorRepository = doctorRepository;
        private readonly IAuthenticationService _authenticationService = authenticationService;

        public string Create(DoctorDto dto)
        {
            // Se não foi informado UserId, tenta criar o usuário automaticamente
            if (dto.UserId <= 0)
            {
                if (string.IsNullOrWhiteSpace(dto.Name) ||
                    string.IsNullOrWhiteSpace(dto.LastName) ||
                    string.IsNullOrWhiteSpace(dto.Username) ||
                    string.IsNullOrWhiteSpace(dto.Email) ||
                    string.IsNullOrWhiteSpace(dto.Password) ||
                    string.IsNullOrWhiteSpace(dto.Cpf))
                {
                    return "Dados de usuário são obrigatórios para criação automática do médico.";
                }

                var userDto = new UserDto
                {
                    Name = dto.Name,
                    LastName = dto.LastName,
                    Username = dto.Username,
                    Email = dto.Email,
                    Password = dto.Password,
                    Cpf = dto.Cpf,
                    Role = Role.Doctor
                };

                var userId = _authenticationService.Create(userDto);
                if (userId == 0)
                {
                    return "Usuário já existe ou não pôde ser criado.";
                }

                dto.UserId = userId;
            }

            var entity = new Doctor(dto.CRM, dto.UserId, dto.SpecialtyId);

            var result = _doctorRepository.Create(entity);
            if (result)
                return "Doutor Criado com sucesso!";
            else
                return "Erro ao criar o doutor!";
        }

        public bool DeleteById(int id)
        {
            var entity = _doctorRepository.GetDoctorById(id);
            if (entity == null) return false;

            return _doctorRepository.Delete(entity);
        }

        public List<DoctorDto> GetAll()
        {
            return _doctorRepository.GetAll()
                .Select(entity => new DoctorDto()
                {
                    DoctorId = entity.DoctorId,
                    SpecialtyId = entity.SpecialtyId,
                    UserId = entity.UserId,
                    CRM = entity.CRM,
                }).ToList();
        }

        public DoctorDto? GetById(int id)
        {
            var entity = _doctorRepository.GetDoctorById(id);
            if (entity == null) return null;

            var dto = new DoctorDto()
            {
                DoctorId = entity.DoctorId,
                UserId = entity.UserId,
                SpecialtyId = entity.SpecialtyId,
                CRM = entity.CRM,
            };
            return dto;
        }

        public bool Update(int id, DoctorDto dto)
        {
            var entity = _doctorRepository.GetDoctorById(id);
            if (entity == null) return false;

            entity.CRM = dto.CRM == "" ? entity.CRM : dto.CRM;
            entity.UserId = dto.UserId;
            entity.SpecialtyId = dto.SpecialtyId;

            var result = _doctorRepository.Update(entity);
            return result;
        }

        public PagedListDto<DoctorDto> GetPaged(int pageNumber, int pageSize, string? search = null)
        {
            return _doctorRepository.GetPaged(pageNumber, pageSize, search);
        }
    }
}
