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
            services.AddScoped<IRepository, Repository>();
            services.AddScoped<IAuthenticationService, AuthenticationService>();
            services.AddScoped<IAuthenticationRepository, AuthenticationRepository>();
            services.AddScoped<IDoctorService, DoctorService>();
            services.AddScoped<IDoctorRepository, DoctorRepository>();
            services.AddScoped<ISpecialtyService, SpecialtyService>();
            services.AddScoped<ISpecialtyRepository, SpecialtyRepository>();
        }
    }
}
