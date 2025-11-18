using Software.Domain.Dtos;
using Software.Domain.Models;

namespace Software.Infraestructure.Contracts
{
    public interface ISpecialtyRepository : IRepository
    {
        bool Create(Specialty specialty);
        List<Specialty> GetAll();
        Specialty? GetById(int id);
        bool Update(Specialty specialty);
        bool Delete(Specialty specialty);
        PagedListDto<SpecialtyDto> GetPaged(int pageNumber, int pageSize, string? search = null);
    }
}
