using Software.Application.Contracts;
using Software.Domain.Dtos;
using Software.Domain.Models;
using Software.Infraestructure.Contracts;

namespace Software.Application.Services
{
    public class PatientService(IPatientRepository patientRepository) : IPatientService
    {
        private readonly IPatientRepository _patientRepository = patientRepository;

        public string Create(PatientDto dto)
        {
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
                    Email = entity.User?.Email,
                    Cpf = entity.User?.Cpf,
                    Phone = null,
                    BirthDate = null
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
