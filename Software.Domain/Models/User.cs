using System.ComponentModel.DataAnnotations;

namespace Software.Domain.Models
{
    public class User
    {
        [Key]
        public int UserId { get; set; }

        [MaxLength(150)]
        public string Name { get; set; } = string.Empty;
        
        [MaxLength(100)]
        public string Username { get; set; } = string.Empty;
    }
}
