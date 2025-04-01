using Software.Application.Contracts;
using Software.Infraestructure.Contracts;

namespace Software.Application.Services
{
    public class AuthenticationService(IAuthenticationRepository authenticationRepository) : IAuthenticationService
    {
        private readonly IAuthenticationRepository _authenticationRepository = authenticationRepository;


    }
}
