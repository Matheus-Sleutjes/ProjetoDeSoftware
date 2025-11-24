namespace Software.Domain.Dtos
{
    public class PatientDto
    {
        public int PatientId { get; set; }
        public int UserId { get; set; }

        // Dados de usuário para criação automática (opcionais em leitura)
        public string? Name { get; set; }
        public string? LastName { get; set; }
        public string? Username { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; }
        public string? Cpf { get; set; }

        public string? Phone { get; set; }
        public DateTime? BirthDate { get; set; }
    }
}
