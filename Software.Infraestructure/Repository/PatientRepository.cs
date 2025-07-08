using Microsoft.EntityFrameworkCore;
using Software.Domain.Models;
using Software.Infraestructure.Contracts;

namespace Software.Infraestructure.Repository
{
    public class PatientRepository(SoftwareContext context) : Repository(context), IPatientRepository
    {
        private readonly SoftwareContext _context = context;
    
        public Patient? GetPatientById(int id)
        {
            return _context.Patient.AsNoTracking()
                                  .FirstOrDefault(x => x.PatientId == id);
        }

        public bool Create(Patient entity)
        {
            _context.Patient.Add(entity);
            SaveChanges();
            return true;
        }

        public bool Update(Patient entity)
        {
            _context.Patient.Update(entity);
            SaveChanges();
            return true;
        }

        public bool Delete(Patient entity)
        {
            _context.Patient.Remove(entity);
            SaveChanges();
            return true;
        }

        public List<Patient> GetAll()
        {
            return _context.Patient.AsNoTracking().ToList();
        }
    }
}
