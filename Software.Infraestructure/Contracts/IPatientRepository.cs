using Software.Domain.Models;

namespace Software.Infraestructure.Contracts
{
    public interface IPatientRepository : IRepository
    {
        Patient? GetPatientById(int id);
        List<Patient> GetAll();
        bool Create(Patient entity);
        bool Update(Patient entity);
        bool Delete(Patient entity);
    }
}
