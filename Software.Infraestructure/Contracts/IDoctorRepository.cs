using Software.Domain.Dtos;
using Software.Domain.Models;

namespace Software.Infraestructure.Contracts
{
    public interface IDoctorRepository : IRepository
    {
        Doctor? GetDoctorById(int id);
        List<Doctor> GetAll();
        bool Create(Doctor doctor);
        bool Update(Doctor doctor);
        bool Delete(Doctor doctor);
        PagedListDto<DoctorDto> GetPaged(int pageNumber, int pageSize, string? search = null);
    }
}
