using Software.Domain.Dtos;

namespace Software.Application.Contracts
{
    public interface IPatientService
    {
        List<PatientDto> GetAll();
        PatientDto? GetById(int id);
        string Create(PatientDto dto);
        bool Update(int id, PatientDto dto);
        bool DeleteById(int id);
        PagedListDto<PatientDto> GetPaged(int pageNumber, int pageSize, string? search = null);
    }
}
