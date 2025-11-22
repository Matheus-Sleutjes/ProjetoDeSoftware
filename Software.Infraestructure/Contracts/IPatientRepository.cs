using Software.Domain.Dtos;
using Software.Domain.Models;

namespace Software.Infraestructure.Contracts
{
    public interface IPatientRepository : IRepository
    {
        Patient? GetPatientById(int id);
        List<Patient> GetAll();
        List<Patient> Search(string? term = null);
        bool Create(Patient entity);
        bool Update(Patient entity);
        bool Delete(Patient entity);
        PagedListDto<PatientDto> GetPaged(int pageNumber, int pageSize, string? search = null);
    }
}
