namespace Software.Domain.Dtos
{
    public class DoctorDto
    {
        public int DoctorId { get; set; }
        public int SpecialtyId { get; set; }
        public int UserId { get; set; }
        public string CRM { get; set; } = string.Empty;

    }
}
