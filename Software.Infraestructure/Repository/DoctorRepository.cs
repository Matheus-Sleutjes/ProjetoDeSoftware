using Microsoft.EntityFrameworkCore;
using Software.Domain.Models;
using Software.Infraestructure.Contracts;

namespace Software.Infraestructure.Repository
{
    public class DoctorRepository(SoftwareContext context) : Repository(context), IDoctorRepository
    {
        private readonly SoftwareContext _context = context;

        public Doctor? GetDoctorById(int id)
        {
            return _context.Doctor.AsNoTracking()
                                  .FirstOrDefault(x => x.DoctorId == id);
        }

        public bool Create(Doctor doctor)
        {
            _context.Doctor.Add(doctor);
            SaveChanges();
            return true;
        }

        public bool Update(Doctor doctor)
        {
            _context.Doctor.Update(doctor);
            SaveChanges();
            return true;
        }

        public bool Delete(Doctor doctor)
        {
            _context.Doctor.Remove(doctor);
            SaveChanges();
            return true;
        }

        public List<Doctor> GetAll()
        {
            return _context.Doctor.AsNoTracking().ToList();
        }
    }
}
