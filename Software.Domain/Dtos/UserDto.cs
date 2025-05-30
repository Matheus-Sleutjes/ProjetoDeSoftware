﻿using Software.Domain.Enums;

namespace Software.Domain.Dtos
{
    public class UserDto
    {
        public int UserId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Username { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string Cpf { get; set; } = string.Empty;
        public Role Role { get; set; }
    }
}
