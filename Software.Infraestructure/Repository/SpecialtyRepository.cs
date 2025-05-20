using Software.Domain.Models;
using Software.Infraestructure.Contracts;

namespace Software.Infraestructure.Repository
{
    public class SpecialtyRepository(SoftwareContext context) : Repository(context), ISpecialtyRepository
    {
        private readonly SoftwareContext _context = context;

        public bool Create(Specialty specialty)
        {
            _context.Specialty.Add(specialty);
            SaveChanges();

            return true;
        }

        public bool Delete(Specialty specialty)
        {
            _context.Specialty.Remove(specialty);
            SaveChanges();

            return true;
        }

        public List<Specialty> GetAll()
        {
            return _context.Specialty.ToList();
        }

        public Specialty? GetById(int id)
        {
            return _context.Specialty.FirstOrDefault(x => x.SpecialtyId == id);
        }
    }
}
