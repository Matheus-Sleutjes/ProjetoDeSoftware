namespace Software.Infraestructure.Contracts
{
    public interface IAuthenticationRepository : IRepository
    {
        string GetNameById(int id);
    }
}
