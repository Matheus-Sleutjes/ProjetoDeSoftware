﻿using Microsoft.EntityFrameworkCore;
using Software.Domain.Models;

namespace Software.Infraestructure
{
    public class SoftwareContext : DbContext
    {
        public SoftwareContext(DbContextOptions<SoftwareContext> options) : base(options) { }
        public DbSet<User> Users { get; set; }
        public DbSet<Doctor> Doctor { get; set; }
        public DbSet<Specialty> Specialty { get; set; }
    }
}
