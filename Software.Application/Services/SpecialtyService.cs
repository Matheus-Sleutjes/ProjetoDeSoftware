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

        public SpecialtyDto? GetById(int id)
        {
            var entity = _specialtyRepository.GetById(id);
            if (entity == null) return null;

            return new SpecialtyDto
            {
                SpecialtyId = entity.SpecialtyId,
                Description = entity.Description
            };
        }

        public bool Update(int id, SpecialtyDto dto)
        {
            var entity = _specialtyRepository.GetById(id);
            if (entity == null) return false;

            entity.Description = dto.Description;
            return _specialtyRepository.Update(entity);
        }

        public bool DeleteById(int id)
        {
            var entity = _specialtyRepository.GetById(id);

            if (entity == null) return false;

            return _specialtyRepository.Delete(entity);
        }

        public PagedListDto<SpecialtyDto> GetPaged(int pageNumber, int pageSize, string? search = null)
        {
            return _specialtyRepository.GetPaged(pageNumber, pageSize, search);
        }
    }
}
