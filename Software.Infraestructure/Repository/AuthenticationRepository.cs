using Microsoft.EntityFrameworkCore;
using Software.Infraestructure.Contracts;

namespace Software.Infraestructure.Repository
{
    public class AuthenticationRepository(SoftwareContext context) : Repository(context), IAuthenticationRepository
    {
        private readonly SoftwareContext _context = context;

        //este metodo exemplo para futuras features, depois que ter outros metodos excluir
        public string GetNameById(int id)
        {
            string userName = _context.Users.AsNoTracking()
                                            .FirstOrDefault(t => t.UserId == id).Name ?? "no-name";
            return userName;
        
        }
    }
}