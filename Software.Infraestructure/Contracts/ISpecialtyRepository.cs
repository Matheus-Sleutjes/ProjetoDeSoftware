using Software.Domain.Models;

namespace Software.Infraestructure.Contracts
{
    public interface ISpecialtyRepository : IRepository
    {
        bool Create(Specialty specialty);
        List<Specialty> GetAll();
        Specialty? GetById(int id);
        bool Delete(Specialty specialty);
    }
}
