using Software.Application.Contracts;
using Software.Domain.Dtos;
using Software.Domain.Models;
using Software.Infraestructure.Contracts;

namespace Software.Application.Services
{
    public class SpecialtyService(ISpecialtyRepository specialtyRepository) : ISpecialtyService
    {
        private readonly ISpecialtyRepository _specialtyRepository = specialtyRepository;

        public string Create(SpecialtyDto dto)
        {
            if (dto == null) return "Informações invalidas";

            var entity = new Specialty(dto.Description);
            _specialtyRepository.Create(entity);

            return "Especialidade criada com sucesso!";
        }
        public List<SpecialtyDto> GetAll()
        {
            return _specialtyRepository.GetAll()
                    .Select(x => new SpecialtyDto
                    {
                        SpecialtyId = x.SpecialtyId,
                        Description = x.Description
                    }).ToList();
        }
        public bool DeleteById(int id)
        {
            var entity = _specialtyRepository.GetById(id);

            if (entity == null) return false;

            return _specialtyRepository.Delete(entity);
        }
    }
}
