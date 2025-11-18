using Software.Domain.Enums;

namespace Software.Domain.Dtos
{
    public class AppointmentDto
    {
        public int AppointmentId { get; set; }
        public int PatientId { get; set; }
        public int DoctorId { get; set; }
        public DateTime AppointmentDate { get; set; }
        public string Description { get; set; } = string.Empty;
        public AppointmentStatus Status { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public string? PatientName { get; set; }
        public string? DoctorName { get; set; }
        public string? SpecialtyName { get; set; }
    }
} 