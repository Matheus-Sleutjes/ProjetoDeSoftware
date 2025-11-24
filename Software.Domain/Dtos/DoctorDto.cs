namespace Software.Domain.Dtos
{
    public class DoctorDto
    {
        public int DoctorId { get; set; }
        public int SpecialtyId { get; set; }
        public int UserId { get; set; }
        public string CRM { get; set; } = string.Empty;

        // Dados de usuário para criação automática (opcionais em leitura)
        public string? Name { get; set; }
        public string? LastName { get; set; }
        public string? Username { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; }
        public string? Cpf { get; set; }

        // Informações adicionais de exibição
        public string? Phone { get; set; }
        public string? SpecialtyName { get; set; }
    }
}
