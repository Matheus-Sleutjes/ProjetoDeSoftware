using Microsoft.EntityFrameworkCore;
using Software.Domain.Models;

namespace Software.Infraestructure
{
    public class SoftwareContext : DbContext
    {
        public SoftwareContext(DbContextOptions<SoftwareContext> options) : base(options) { }
        public DbSet<User> Users { get; set; }
        public DbSet<Doctor> Doctor { get; set; }
        public DbSet<Specialty> Specialty { get; set; }
        public DbSet<Patient> Patient { get; set; }
        public DbSet<Appointment> Appointment { get; set; }
        public DbSet<PaymentMethod> PaymentMethod { get; set; }
        public DbSet<Payment> Payment { get; set; }
    }
}
