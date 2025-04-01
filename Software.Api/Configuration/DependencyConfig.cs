using Software.Application.Contracts;
using Software.Application.Services;
using Software.Infraestructure.Contracts;
using Software.Infraestructure.Repository;

namespace Software.Api.Configuration
{
    public static class DependencyConfig
    {
        public static void DependencyRegister(this IServiceCollection services)
        {
            services.AddScoped<IAuthenticationService, AuthenticationService>();
            services.AddScoped<IAuthenticationRepository, AuthenticationRepository>();
        }
    }
}
