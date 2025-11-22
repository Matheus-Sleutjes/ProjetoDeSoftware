namespace Software.Domain.Dtos
{
    public class PaymentDto
    {
        public int PaymentId { get; set; }
        public DateTime PaymentDate { get; set; }
        public int PaymentMethodId { get; set; }
        public int UserId { get; set; }
        public int AppointmentId { get; set; }

        public string? PaymentMethodDescription { get; set; }
        public string? UserName { get; set; }
    }
}




