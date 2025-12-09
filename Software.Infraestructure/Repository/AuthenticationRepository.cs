using Dapper;
using Npgsql;
using Software.Domain.Dtos;
using Software.Domain.Enums;
using Software.Domain.Models;
using Software.Infraestructure.Contracts;
using System.Data;

namespace Software.Infraestructure.Repository
{
    public class AuthenticationRepository : IAuthenticationRepository
    {
        private IDbConnection GetConnection() => new NpgsqlConnection(DatabaseConfig.ConnectionString);


        public User? GetByEmail(string email)
        {
            using var connection = GetConnection();
            var sql = File.ReadAllText("Queries/GetUserByEmail.sql");
            
            return connection.QueryFirstOrDefault<User>(sql, new { Email = email });
        }

        public User? GetByUsername(string username)
        {
            using var connection = GetConnection();
            var sql = File.ReadAllText("Queries/GetUserByUsername.sql");
            
            return connection.QueryFirstOrDefault<User>(sql, new { Username = username });
        }

        public bool ValidateUserExists(string email, string username)
        {
            using var connection = GetConnection();
            var sql = File.ReadAllText("Queries/ValidateUserExists.sql");
            
            return connection.QuerySingle<bool>(sql, new { Email = email, Username = username });
        }

        public int Create(User user)
        {
            using var connection = GetConnection();
            var sql = File.ReadAllText("Queries/CreateUser.sql");
            
            var userId = connection.QuerySingle<int>(sql, new
            {
                Name = user.Name,
                LastName = user.LastName,
                Username = user.Username,
                Email = user.Email,
                Password = user.Password,
                Cpf = user.Cpf,
                Phone = user.Phone,
                BirthDate = user.BirthDate,
                Role = user.Role
            });
            
            return userId;
        }

        public User? GetById(int id)
        {
            using var connection = GetConnection();
            var sql = File.ReadAllText("Queries/GetUserById.sql");
            
            return connection.QueryFirstOrDefault<User>(sql, new { UserId = id });
        }

        public void Delete(User user)
        {
            using var connection = GetConnection();
            var sql = File.ReadAllText("Queries/DeleteUser.sql");
            
            connection.Execute(sql, new { UserId = user.UserId });
        }

        public void Update(User user)
        {
            using var connection = GetConnection();
            var sql = File.ReadAllText("Queries/UpdateUser.sql");
            
            connection.Execute(sql, new
            {
                UserId = user.UserId,
                Name = user.Name,
                LastName = user.LastName,
                Username = user.Username,
                Email = user.Email,
                Password = user.Password,
                Cpf = user.Cpf,
                Phone = user.Phone,
                BirthDate = user.BirthDate,
                Role = user.Role
            });
        }

        public List<UserDto> GetAllByParameter(int roleId)
        {
            using var connection = GetConnection();
            var sql = File.ReadAllText("Queries/GetAllUsersByParameter.sql");
            
            return connection.Query<UserDto>(sql, new { RoleId = roleId }).ToList();
        }

        public User? GetByCpf(string cpf)
        {
            using var connection = GetConnection();
            var sql = File.ReadAllText("Queries/GetUserByCpf.sql");
            
            return connection.QueryFirstOrDefault<User>(sql, new { Cpf = cpf });
        }

        public PagedListDto<UserDto> GetPaged(int pageNumber, int pageSize, string? search = null)
        {
            using var connection = GetConnection();
            
            var countSql = File.ReadAllText("Queries/GetPagedUsersCount.sql");
            var dataSql = File.ReadAllText("Queries/GetPagedUsers.sql");
            
            var parameters = new
            {
                Search = search,
                PageSize = pageSize,
                Offset = (pageNumber - 1) * pageSize
            };
            
            var totalCount = connection.QuerySingle<int>(countSql, parameters);
            var totalPages = (int)Math.Ceiling(totalCount / (double)pageSize);
            
            var items = connection.Query<UserDto>(dataSql, parameters).ToList();
            
            return new PagedListDto<UserDto>
            {
                Items = items,
                PageNumber = pageNumber,
                PageSize = pageSize,
                TotalCount = totalCount,
                TotalPages = totalPages,
                Search = search
            };
        }
    }
}
