using System.ComponentModel.DataAnnotations;

namespace Software.Domain.Models
{
    public class Payment
    {
        public Payment() { }

        public Payment(DateTime paymentDate, int paymentMethodId, int userId)
        {
            PaymentDate = paymentDate;
            PaymentMethodId = paymentMethodId;
            UserId = userId;
        }

        public Payment(DateTime paymentDate, int paymentMethodId, int userId, int appointmentId)
        {
            PaymentDate = paymentDate;
            PaymentMethodId = paymentMethodId;
            UserId = userId;
            AppointmentId = appointmentId;
        }

        [Key]
        public int PaymentId { get; set; }

        [Required]
        public DateTime PaymentDate { get; set; }

        [Required]
        public int PaymentMethodId { get; set; }
        public PaymentMethod? PaymentMethod { get; set; }

        [Required]
        public int UserId { get; set; }
        public User? User { get; set; }

        [Required]
        public int AppointmentId { get; set; }
        public Appointment? Appointment { get; set; }
    }
}




