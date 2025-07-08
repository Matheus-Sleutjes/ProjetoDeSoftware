using System.ComponentModel.DataAnnotations;

namespace Software.Domain.Models
{
    public class Patient
    {
        public Patient(int usuarioId)
        {
            UserId = usuarioId;
        }
        public Patient() { }

        [Key]
        public int PatientId { get; set; }

        [Required]
        public int UserId { get; set; }
        public User? User { get; set; }
    }
}
