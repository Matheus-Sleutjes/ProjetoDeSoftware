using Software.Infraestructure.Contracts;

namespace Software.Infraestructure.Repository
{
    public class Repository(SoftwareContext context) : IRepository
    {
        private readonly SoftwareContext _context = context;
        public void SaveChanges()
        {
            _context.SaveChanges();
        }
    }
}

