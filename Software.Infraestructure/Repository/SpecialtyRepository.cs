using Dapper;
using Npgsql;
using Software.Domain.Dtos;
using Software.Domain.Models;
using Software.Infraestructure.Contracts;
using System.Data;

namespace Software.Infraestructure.Repository
{
    public class SpecialtyRepository : ISpecialtyRepository
    {
        private IDbConnection GetConnection() => new NpgsqlConnection(DatabaseConfig.ConnectionString);


        public bool Create(Specialty specialty)
        {
            using var connection = GetConnection();
            var sql = File.ReadAllText("Queries/CreateSpecialty.sql");
            
            var specialtyId = connection.QuerySingle<int>(sql, new { Description = specialty.Description });
            
            specialty.SpecialtyId = specialtyId;
            return true;
        }

        public bool Delete(Specialty specialty)
        {
            using var connection = GetConnection();
            var sql = File.ReadAllText("Queries/DeleteSpecialty.sql");
            
            var rowsAffected = connection.Execute(sql, new { SpecialtyId = specialty.SpecialtyId });
            return rowsAffected > 0;
        }

        public bool Update(Specialty specialty)
        {
            using var connection = GetConnection();
            var sql = File.ReadAllText("Queries/UpdateSpecialty.sql");
            
            var rowsAffected = connection.Execute(sql, new
            {
                SpecialtyId = specialty.SpecialtyId,
                Description = specialty.Description
            });
            
            return rowsAffected > 0;
        }

        public List<Specialty> GetAll()
        {
            using var connection = GetConnection();
            var sql = File.ReadAllText("Queries/GetAllSpecialties.sql");
            
            return connection.Query<Specialty>(sql).ToList();
        }

        public Specialty? GetById(int id)
        {
            using var connection = GetConnection();
            var sql = File.ReadAllText("Queries/GetSpecialtyById.sql");
            
            return connection.QueryFirstOrDefault<Specialty>(sql, new { SpecialtyId = id });
        }

        public PagedListDto<SpecialtyDto> GetPaged(int pageNumber, int pageSize, string? search = null)
        {
            using var connection = GetConnection();
            
            var countSql = File.ReadAllText("Queries/GetPagedSpecialtiesCount.sql");
            var dataSql = File.ReadAllText("Queries/GetPagedSpecialties.sql");
            
            var parameters = new
            {
                Search = search,
                PageSize = pageSize,
                Offset = (pageNumber - 1) * pageSize
            };
            
            var totalCount = connection.QuerySingle<int>(countSql, parameters);
            var totalPages = (int)Math.Ceiling(totalCount / (double)pageSize);
            
            var items = connection.Query<SpecialtyDto>(dataSql, parameters).ToList();
            
            return new PagedListDto<SpecialtyDto>
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
