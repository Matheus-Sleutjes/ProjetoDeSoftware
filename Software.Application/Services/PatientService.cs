using Software.Application.Contracts;
using Software.Domain.Dtos;
using Software.Domain.Models;
using Software.Infraestructure.Contracts;
using Software.Infraestructure.Repository;

namespace Software.Application.Services
{
    public class PatientService(IPatientRepository patientRepository) : IPatientService
    {
        private readonly IPatientRepository _patientRepository = patientRepository;

        public string Create(PatientDto dto)
        {
            //var entity = new Patient(dto.CRM, dto.UserId, dto.SpecialtyId);

            //var result = _patientRepository.Create(entity);
            //if (result)
            //    return "Paciente Criado com sucesso!";
            //else
            //    return "Erro ao criar o paciente!";
            return "Método Create não implementado ainda.";
        }

        public bool DeleteById(int id)
        {
            throw new NotImplementedException();
        }

        public List<PatientDto> GetAll()
        {
            throw new NotImplementedException();
        }

        public PatientDto? GetById(int id)
        {
            throw new NotImplementedException();
        }

        public bool Update(int id, PatientDto dto)
        {
            throw new NotImplementedException();
        }
    }
}
