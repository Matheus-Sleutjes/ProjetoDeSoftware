using System.ComponentModel.DataAnnotations;

namespace Software.Domain.Models
{
    public class Specialty
    {
        public Specialty() { }
        public Specialty(string description)
        {
            Description = description;
        }

        [Key]
        public int SpecialtyId { get; set; }

        [Required, MaxLength(100)]
        public string Description { get; set; } = string.Empty;
    }
}
