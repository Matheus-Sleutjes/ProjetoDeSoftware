namespace Software.Domain.Dtos
{
    public class DoctorDto
    {
        public int DoctorId { get; set; }
        public int SpecialtyId { get; set; }
        public int UserId { get; set; }
        public string CRM { get; set; } = string.Empty;
        public string? Name { get; set; }
        public string? Email { get; set; }
        public string? Phone { get; set; }
        public string? SpecialtyName { get; set; }
    }
}
