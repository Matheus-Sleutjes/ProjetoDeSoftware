using System.ComponentModel.DataAnnotations;

namespace Software.Domain.Models
{
    public class PaymentMethod
    {
        public PaymentMethod() { }

        public PaymentMethod(string description)
        {
            Description = description;
        }

        [Key]
        public int PaymentMethodId { get; set; }

        [Required, MaxLength(100)]
        public string Description { get; set; } = string.Empty;
    }
}




