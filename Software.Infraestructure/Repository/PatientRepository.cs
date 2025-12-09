using Dapper;
using Npgsql;
using Software.Domain.Dtos;
using Software.Domain.Models;
using Software.Infraestructure.Contracts;
using System.Data;

namespace Software.Infraestructure.Repository
{
    public class PatientRepository : IPatientRepository
    {
        private IDbConnection GetConnection() => new NpgsqlConnection(DatabaseConfig.ConnectionString);

        public Patient? GetPatientById(int id)
        {
            using var connection = GetConnection();
            var sql = File.ReadAllText("Queries/GetPatientById.sql");
            
            var patient = connection.QuerySingleOrDefault<Patient>(sql, new { PatientId = id });
            
            if (patient == null) return null;
            
            if (patient.UserId > 0)
            {
                patient.User = connection.QuerySingleOrDefault<User>(
                    "SELECT \"UserId\", \"Name\", \"LastName\", \"Username\", \"Email\", \"Password\", \"Cpf\", \"Phone\", \"BirthDate\", \"Role\" FROM \"Users\" WHERE \"UserId\" = @Id",
                    new { Id = patient.UserId });
            }
            
            return patient;
        }

        public bool Create(Patient entity)
        {
            using var connection = GetConnection();
            var sql = File.ReadAllText("Queries/CreatePatient.sql");
            
            var patientId = connection.QuerySingle<int>(sql, new { UserId = entity.UserId });
            
            entity.PatientId = patientId;
            return true;
        }

        public bool Update(Patient entity)
        {
            using var connection = GetConnection();
            var sql = File.ReadAllText("Queries/UpdatePatient.sql");
            
            var rowsAffected = connection.Execute(sql, new
            {
                PatientId = entity.PatientId,
                UserId = entity.UserId
            });
            
            return rowsAffected > 0;
        }

        public bool Delete(Patient entity)
        {
            using var connection = GetConnection();
            var sql = File.ReadAllText("Queries/DeletePatient.sql");
            
            var rowsAffected = connection.Execute(sql, new { PatientId = entity.PatientId });
            return rowsAffected > 0;
        }

        public List<Patient> GetAll()
        {
            using var connection = GetConnection();
            var sql = File.ReadAllText("Queries/GetAllPatients.sql");
            
            var patients = connection.Query<Patient>(sql).ToList();
            
            foreach (var patient in patients)
            {
                if (patient.UserId > 0)
                {
                    patient.User = connection.QuerySingleOrDefault<User>(
                        "SELECT \"UserId\", \"Name\", \"LastName\", \"Username\", \"Email\", \"Password\", \"Cpf\", \"Phone\", \"BirthDate\", \"Role\" FROM \"Users\" WHERE \"UserId\" = @Id",
                        new { Id = patient.UserId });
                }
            }
            
            return patients;
        }

        public List<Patient> Search(string? term = null)
        {
            using var connection = GetConnection();
            var sql = File.ReadAllText("Queries/SearchPatients.sql");
            
            var patients = new Dictionary<int, Patient>();
            
            connection.Query<Patient, User, Patient>(
                sql,
                (patient, user) =>
                {
                    if (!patients.TryGetValue(patient.PatientId, out var currentPatient))
                    {
                        currentPatient = patient;
                        currentPatient.User = user;
                        patients.Add(patient.PatientId, currentPatient);
                    }
                    return currentPatient;
                },
                new { Term = term?.Trim() },
                splitOn: "UserUserId"
            );
            
            return patients.Values.ToList();
        }

        public PagedListDto<PatientDto> GetPaged(int pageNumber, int pageSize, string? search = null)
        {
            using var connection = GetConnection();
            
            var countSql = File.ReadAllText("Queries/GetPagedPatientsCount.sql");
            var dataSql = File.ReadAllText("Queries/GetPagedPatients.sql");
            
            var parameters = new
            {
                Search = search,
                PageSize = pageSize,
                Offset = (pageNumber - 1) * pageSize
            };
            
            var totalCount = connection.QuerySingle<int>(countSql, parameters);
            var totalPages = (int)Math.Ceiling(totalCount / (double)pageSize);
            
            var items = connection.Query<PatientDto>(dataSql, parameters).ToList();
            
            return new PagedListDto<PatientDto>
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
