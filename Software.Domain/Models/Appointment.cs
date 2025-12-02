using System.ComponentModel.DataAnnotations;
using Software.Domain.Enums;

namespace Software.Domain.Models
{
    public class Appointment
    {
        public Appointment() { }

        public Appointment(int patientId, int doctorId, DateTime appointmentDate, string description)
        {
            PatientId = patientId;
            DoctorId = doctorId;
            AppointmentDate = appointmentDate;
            Description = description;
            Status = AppointmentStatus.Scheduled;
            CreatedAt = DateTime.UtcNow;
        }

        [Key]
        public int AppointmentId { get; set; }

        [Required]
        public int PatientId { get; set; }
        public Patient? Patient { get; set; }

        [Required]
        public int DoctorId { get; set; }
        public Doctor? Doctor { get; set; }

        [Required]
        public DateTime AppointmentDate { get; set; }

        [MaxLength(500)]
        public string Description { get; set; } = string.Empty;

        [Required]
        public AppointmentStatus Status { get; set; }

        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }
} 