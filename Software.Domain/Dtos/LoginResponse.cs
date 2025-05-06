namespace Software.Domain.Dtos
{
    public class LoginResponse
    {
        public string Message { get; set; } = string.Empty;
        public string Token { get; set; } = string.Empty;
        public bool Success { get; set; }
    }
}
