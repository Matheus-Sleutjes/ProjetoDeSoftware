using System.ComponentModel.DataAnnotations;

namespace Software.Domain.Models
{
    public class Doctor
    {
        public Doctor() { }

        public Doctor(string crm, int userId, int specialtyId)
        {
            CRM = crm;
            UserId = userId;
            SpecialtyId = specialtyId;
        }

        [Key]
        public int DoctorId { get; set; }

        [Required]
        public string CRM { get; set; } = string.Empty;

        [Required]
        public int UserId { get; set; }
        public User? User { get; set; }

        [Required]
        public int SpecialtyId { get; set; }
        public Specialty? Specialty { get; set; }




    }
}
