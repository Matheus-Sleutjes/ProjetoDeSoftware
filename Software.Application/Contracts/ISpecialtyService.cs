using Software.Domain.Dtos;

namespace Software.Application.Contracts
{
    public interface ISpecialtyService
    {
        string Create(SpecialtyDto dto);
        List<SpecialtyDto> GetAll();
        SpecialtyDto? GetById(int id);
        bool Update(int id, SpecialtyDto dto);
        bool DeleteById(int id);
        PagedListDto<SpecialtyDto> GetPaged(int pageNumber, int pageSize, string? search = null);
    }
}
