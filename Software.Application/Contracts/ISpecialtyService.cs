using Software.Domain.Dtos;

namespace Software.Application.Contracts
{
    public interface ISpecialtyService
    {
        string Create(SpecialtyDto dto);
        List<SpecialtyDto> GetAll();
        bool DeleteById(int id);
    }
}
