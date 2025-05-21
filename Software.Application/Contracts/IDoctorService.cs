using Software.Domain.Dtos;

namespace Software.Application.Contracts
{
    public interface IDoctorService
    {
        List<DoctorDto> GetAll();
        DoctorDto GetById(int id);
        string Create(DoctorDto doctor);
        bool Update(int id, DoctorDto doctor);
        bool DeleteById(int id);
    }
}
