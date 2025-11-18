namespace Software.Domain.Dtos
{
    public class SpecialtyDto
    {
        public int SpecialtyId { get; set; }
        public string Description { get; set; } = string.Empty;
        public string? Name { get; set; }
        public int? DoctorCount { get; set; }
    }
}
