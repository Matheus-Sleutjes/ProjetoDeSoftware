using Software.Domain.Enums;
using System.ComponentModel.DataAnnotations;

namespace Software.Domain.Models
{
    public class User
    {
        public User(string name, string lastName, string username, string email, string password, Role role)
        {
            Name = name;
            LastName = lastName;
            Username = username;
            Email = email;
            Password = password;
            Role = role;
        }

        [Key]
        public int UserId { get; set; }

        [MaxLength(100), Required]
        public string Name { get; set; } = string.Empty;
        
        [MaxLength(100), Required]
        public string LastName { get; set; } = string.Empty;
        
        [MaxLength(100), Required]
        public string Username { get; set; } = string.Empty;

        [MaxLength(100), Required]
        public string Email { get; set; } = string.Empty;

        [Required]
        public string Password { get; set; } = string.Empty;

        [Required]
        public Role Role { get; set; }

        public string GetFullName()
        {
            return $"{Name} {LastName}";
        }

        public bool VerifyPassword(string password)
        {
            return Password == password;
        }
    }
}
