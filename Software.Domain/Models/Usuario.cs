using System.ComponentModel.DataAnnotations;

namespace Software.Domain.Models
{
    public class Usuario
    {
        [Key]
        public int UsuarioId { get; set; }

        [MaxLength(150)]
        public string Nome { get; set; } = string.Empty;
        
        [MaxLength(100)]
        public string Username { get; set; } = string.Empty;
    }
}
