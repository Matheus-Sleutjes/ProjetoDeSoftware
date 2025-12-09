using Dapper;
using Npgsql;
using Software.Domain.Dtos;
using Software.Domain.Models;
using Software.Infraestructure.Contracts;
using System.Data;

namespace Software.Infraestructure.Repository
{
    public class PaymentMethodRepository : IPaymentMethodRepository
    {
        private IDbConnection GetConnection() => new NpgsqlConnection(DatabaseConfig.ConnectionString);

        public bool Create(PaymentMethod paymentMethod)
        {
            using var connection = GetConnection();
            var sql = File.ReadAllText("Queries/CreatePaymentMethod.sql");
            
            var paymentMethodId = connection.QuerySingle<int>(sql, new { Description = paymentMethod.Description });
            
            paymentMethod.PaymentMethodId = paymentMethodId;
            return true;
        }

        public bool Delete(PaymentMethod paymentMethod)
        {
            using var connection = GetConnection();
            var sql = File.ReadAllText("Queries/DeletePaymentMethod.sql");
            
            var rowsAffected = connection.Execute(sql, new { PaymentMethodId = paymentMethod.PaymentMethodId });
            return rowsAffected > 0;
        }

        public bool Update(PaymentMethod paymentMethod)
        {
            using var connection = GetConnection();
            var sql = File.ReadAllText("Queries/UpdatePaymentMethod.sql");
            
            var rowsAffected = connection.Execute(sql, new
            {
                PaymentMethodId = paymentMethod.PaymentMethodId,
                Description = paymentMethod.Description
            });
            
            return rowsAffected > 0;
        }

        public List<PaymentMethod> GetAll()
        {
            using var connection = GetConnection();
            var sql = File.ReadAllText("Queries/GetAllPaymentMethods.sql");
            
            return connection.Query<PaymentMethod>(sql).ToList();
        }

        public PaymentMethod? GetById(int id)
        {
            using var connection = GetConnection();
            var sql = File.ReadAllText("Queries/GetPaymentMethodById.sql");
            
            return connection.QueryFirstOrDefault<PaymentMethod>(sql, new { PaymentMethodId = id });
        }

        public PagedListDto<PaymentMethodDto> GetPaged(int pageNumber, int pageSize, string? search = null)
        {
            using var connection = GetConnection();
            
            var countSql = File.ReadAllText("Queries/GetPagedPaymentMethodsCount.sql");
            var dataSql = File.ReadAllText("Queries/GetPagedPaymentMethods.sql");
            
            var parameters = new
            {
                Search = search,
                PageSize = pageSize,
                Offset = (pageNumber - 1) * pageSize
            };
            
            var totalCount = connection.QuerySingle<int>(countSql, parameters);
            var totalPages = (int)Math.Ceiling(totalCount / (double)pageSize);
            
            var items = connection.Query<PaymentMethodDto>(dataSql, parameters).ToList();
            
            return new PagedListDto<PaymentMethodDto>
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
