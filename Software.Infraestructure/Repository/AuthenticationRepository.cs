using Software.Infraestructure.Contracts;

namespace Software.Infraestructure.Repository
{
    public class AuthenticationRepository(SoftwareContext context) : IAuthenticationRepository
    {
        private readonly SoftwareContext _context = context;
    }
}
