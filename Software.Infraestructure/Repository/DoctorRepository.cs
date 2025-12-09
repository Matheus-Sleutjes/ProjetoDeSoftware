using Dapper;
using Npgsql;
using Software.Domain.Dtos;
using Software.Domain.Models;
using Software.Infraestructure.Contracts;
using System.Data;

namespace Software.Infraestructure.Repository
{
    public class DoctorRepository : IDoctorRepository
    {
        private IDbConnection GetConnection() => new NpgsqlConnection(DatabaseConfig.ConnectionString);


        public Doctor? GetDoctorById(int id)
        {
            using var connection = GetConnection();
            var sql = File.ReadAllText("Queries/GetDoctorById.sql");
            
            var doctor = connection.QuerySingleOrDefault<Doctor>(sql, new { DoctorId = id });
            
            if (doctor == null) return null;
            
            if (doctor.UserId > 0)
            {
                doctor.User = connection.QuerySingleOrDefault<User>(
                    "SELECT \"UserId\", \"Name\", \"LastName\", \"Username\", \"Email\", \"Password\", \"Cpf\", \"Phone\", \"BirthDate\", \"Role\" FROM \"Users\" WHERE \"UserId\" = @Id",
                    new { Id = doctor.UserId });
            }
            
            if (doctor.SpecialtyId > 0)
            {
                doctor.Specialty = connection.QuerySingleOrDefault<Specialty>(
                    "SELECT \"SpecialtyId\", \"Description\" FROM \"Specialty\" WHERE \"SpecialtyId\" = @Id",
                    new { Id = doctor.SpecialtyId });
            }
            
            return doctor;
        }

        public bool Create(Doctor doctor)
        {
            using var connection = GetConnection();
            
            var checkUserSql = File.ReadAllText("Queries/CheckUserExists.sql");
            var userExists = connection.QuerySingle<bool>(checkUserSql, new { UserId = doctor.UserId });
            
            if (!userExists)
            {
                return false;
            }
            
            var sql = File.ReadAllText("Queries/CreateDoctor.sql");
            var doctorId = connection.QuerySingle<int>(sql, new
            {
                CRM = doctor.CRM,
                UserId = doctor.UserId,
                SpecialtyId = doctor.SpecialtyId
            });
            
            doctor.DoctorId = doctorId;
            return true;
        }

        public bool Update(Doctor doctor)
        {
            using var connection = GetConnection();
            var sql = File.ReadAllText("Queries/UpdateDoctor.sql");
            
            var rowsAffected = connection.Execute(sql, new
            {
                DoctorId = doctor.DoctorId,
                CRM = doctor.CRM,
                UserId = doctor.UserId,
                SpecialtyId = doctor.SpecialtyId
            });
            
            return rowsAffected > 0;
        }

        public bool Delete(Doctor doctor)
        {
            using var connection = GetConnection();
            var sql = File.ReadAllText("Queries/DeleteDoctor.sql");
            
            var rowsAffected = connection.Execute(sql, new { DoctorId = doctor.DoctorId });
            return rowsAffected > 0;
        }

        public List<Doctor> GetAll()
        {
            using var connection = GetConnection();
            var sql = File.ReadAllText("Queries/GetAllDoctors.sql");
            
            var doctors = connection.Query<Doctor>(sql).ToList();
            
            foreach (var doctor in doctors)
            {
                if (doctor.UserId > 0)
                {
                    doctor.User = connection.QuerySingleOrDefault<User>(
                        "SELECT \"UserId\", \"Name\", \"LastName\", \"Username\", \"Email\", \"Password\", \"Cpf\", \"Phone\", \"BirthDate\", \"Role\" FROM \"Users\" WHERE \"UserId\" = @Id",
                        new { Id = doctor.UserId });
                }
                
                if (doctor.SpecialtyId > 0)
                {
                    doctor.Specialty = connection.QuerySingleOrDefault<Specialty>(
                        "SELECT \"SpecialtyId\", \"Description\" FROM \"Specialty\" WHERE \"SpecialtyId\" = @Id",
                        new { Id = doctor.SpecialtyId });
                }
            }
            
            return doctors;
        }

        public PagedListDto<DoctorDto> GetPaged(int pageNumber, int pageSize, string? search = null)
        {
            using var connection = GetConnection();
            
            var countSql = File.ReadAllText("Queries/GetPagedDoctorsCount.sql");
            var dataSql = File.ReadAllText("Queries/GetPagedDoctors.sql");
            
            var parameters = new
            {
                Search = search,
                PageSize = pageSize,
                Offset = (pageNumber - 1) * pageSize
            };
            
            var totalCount = connection.QuerySingle<int>(countSql, parameters);
            var totalPages = (int)Math.Ceiling(totalCount / (double)pageSize);
            
            var items = connection.Query<DoctorDto>(dataSql, parameters).ToList();
            
            return new PagedListDto<DoctorDto>
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
