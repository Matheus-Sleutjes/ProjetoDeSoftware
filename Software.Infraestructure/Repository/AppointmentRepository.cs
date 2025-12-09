using Dapper;
using Npgsql;
using Software.Domain.Dtos;
using Software.Domain.Models;
using Software.Infraestructure.Contracts;
using System.Data;

namespace Software.Infraestructure.Repository
{
    public class AppointmentRepository : IAppointmentRepository
    {
        private IDbConnection GetConnection() => new NpgsqlConnection(DatabaseConfig.ConnectionString);


        public Appointment? GetAppointmentById(int id)
        {
            using var connection = GetConnection();
            var sql = File.ReadAllText("Queries/GetAppointmentById.sql");
            
            var appointment = connection.QuerySingleOrDefault<Appointment>(sql, new { AppointmentId = id });
            
            if (appointment == null) return null;
            
            if (appointment.PatientId > 0)
            {
                appointment.Patient = connection.QuerySingleOrDefault<Patient>(
                    "SELECT \"PatientId\", \"UserId\" FROM \"Patient\" WHERE \"PatientId\" = @Id",
                    new { Id = appointment.PatientId });
                    
                if (appointment.Patient != null && appointment.Patient.UserId > 0)
                {
                    appointment.Patient.User = connection.QuerySingleOrDefault<User>(
                        "SELECT \"UserId\", \"Name\", \"LastName\", \"Username\", \"Email\", \"Password\", \"Cpf\", \"Phone\", \"BirthDate\", \"Role\" FROM \"Users\" WHERE \"UserId\" = @Id",
                        new { Id = appointment.Patient.UserId });
                }
            }
            
            if (appointment.DoctorId > 0)
            {
                appointment.Doctor = connection.QuerySingleOrDefault<Doctor>(
                    "SELECT \"DoctorId\", \"CRM\", \"UserId\", \"SpecialtyId\" FROM \"Doctor\" WHERE \"DoctorId\" = @Id",
                    new { Id = appointment.DoctorId });
                    
                if (appointment.Doctor != null)
                {
                    if (appointment.Doctor.UserId > 0)
                    {
                        appointment.Doctor.User = connection.QuerySingleOrDefault<User>(
                            "SELECT \"UserId\", \"Name\", \"LastName\", \"Username\", \"Email\", \"Password\", \"Cpf\", \"Phone\", \"BirthDate\", \"Role\" FROM \"Users\" WHERE \"UserId\" = @Id",
                            new { Id = appointment.Doctor.UserId });
                    }
                    
                    if (appointment.Doctor.SpecialtyId > 0)
                    {
                        appointment.Doctor.Specialty = connection.QuerySingleOrDefault<Specialty>(
                            "SELECT \"SpecialtyId\", \"Description\" FROM \"Specialty\" WHERE \"SpecialtyId\" = @Id",
                            new { Id = appointment.Doctor.SpecialtyId });
                    }
                }
            }
            
            return appointment;
        }

        public bool Create(Appointment entity)
        {
            using var connection = GetConnection();
            var sql = File.ReadAllText("Queries/CreateAppointment.sql");
            
            var appointmentId = connection.QuerySingle<int>(sql, new
            {
                AppointmentDate = entity.AppointmentDate,
                Description = entity.Description,
                Status = entity.Status,
                PatientId = entity.PatientId,
                DoctorId = entity.DoctorId,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            });
            
            entity.AppointmentId = appointmentId;
            return true;
        }

        public bool Update(Appointment entity)
        {
            using var connection = GetConnection();
            var sql = File.ReadAllText("Queries/UpdateAppointment.sql");
            
            var rowsAffected = connection.Execute(sql, new
            {
                AppointmentId = entity.AppointmentId,
                AppointmentDate = entity.AppointmentDate,
                Description = entity.Description,
                Status = entity.Status,
                PatientId = entity.PatientId,
                DoctorId = entity.DoctorId,
                UpdatedAt = DateTime.UtcNow
            });
            
            return rowsAffected > 0;
        }

        public bool Delete(Appointment entity)
        {
            using var connection = GetConnection();
            var sql = File.ReadAllText("Queries/DeleteAppointment.sql");
            
            var rowsAffected = connection.Execute(sql, new { AppointmentId = entity.AppointmentId });
            return rowsAffected > 0;
        }

        public List<Appointment> GetAll()
        {
            using var connection = GetConnection();
            var sql = File.ReadAllText("Queries/GetAllAppointments.sql");
            
            var appointments = connection.Query<Appointment>(sql).ToList();
            
            foreach (var appointment in appointments)
            {
                if (appointment.PatientId > 0)
                {
                    appointment.Patient = connection.QuerySingleOrDefault<Patient>(
                        "SELECT \"PatientId\", \"UserId\" FROM \"Patient\" WHERE \"PatientId\" = @Id",
                        new { Id = appointment.PatientId });
                        
                    if (appointment.Patient != null && appointment.Patient.UserId > 0)
                    {
                        appointment.Patient.User = connection.QuerySingleOrDefault<User>(
                            "SELECT \"UserId\", \"Name\", \"LastName\", \"Username\", \"Email\", \"Password\", \"Cpf\", \"Phone\", \"BirthDate\", \"Role\" FROM \"Users\" WHERE \"UserId\" = @Id",
                            new { Id = appointment.Patient.UserId });
                    }
                }
                
                if (appointment.DoctorId > 0)
                {
                    appointment.Doctor = connection.QuerySingleOrDefault<Doctor>(
                        "SELECT \"DoctorId\", \"CRM\", \"UserId\", \"SpecialtyId\" FROM \"Doctor\" WHERE \"DoctorId\" = @Id",
                        new { Id = appointment.DoctorId });
                        
                    if (appointment.Doctor != null)
                    {
                        if (appointment.Doctor.UserId > 0)
                        {
                            appointment.Doctor.User = connection.QuerySingleOrDefault<User>(
                                "SELECT \"UserId\", \"Name\", \"LastName\", \"Username\", \"Email\", \"Password\", \"Cpf\", \"Phone\", \"BirthDate\", \"Role\" FROM \"Users\" WHERE \"UserId\" = @Id",
                                new { Id = appointment.Doctor.UserId });
                        }
                        
                        if (appointment.Doctor.SpecialtyId > 0)
                        {
                            appointment.Doctor.Specialty = connection.QuerySingleOrDefault<Specialty>(
                                "SELECT \"SpecialtyId\", \"Description\" FROM \"Specialty\" WHERE \"SpecialtyId\" = @Id",
                                new { Id = appointment.Doctor.SpecialtyId });
                        }
                    }
                }
            }
            
            return appointments;
        }

        public List<Appointment> GetByPatientId(int patientId)
        {
            using var connection = GetConnection();
            var sql = File.ReadAllText("Queries/GetAppointmentsByPatientId.sql");
            
            var appointments = connection.Query<Appointment>(sql, new { PatientId = patientId }).ToList();
            
            foreach (var appointment in appointments)
            {
                if (appointment.PatientId > 0)
                {
                    appointment.Patient = connection.QuerySingleOrDefault<Patient>(
                        "SELECT \"PatientId\", \"UserId\" FROM \"Patient\" WHERE \"PatientId\" = @Id",
                        new { Id = appointment.PatientId });
                        
                    if (appointment.Patient != null && appointment.Patient.UserId > 0)
                    {
                        appointment.Patient.User = connection.QuerySingleOrDefault<User>(
                            "SELECT \"UserId\", \"Name\", \"LastName\", \"Username\", \"Email\", \"Password\", \"Cpf\", \"Phone\", \"BirthDate\", \"Role\" FROM \"Users\" WHERE \"UserId\" = @Id",
                            new { Id = appointment.Patient.UserId });
                    }
                }
                
                if (appointment.DoctorId > 0)
                {
                    appointment.Doctor = connection.QuerySingleOrDefault<Doctor>(
                        "SELECT \"DoctorId\", \"CRM\", \"UserId\", \"SpecialtyId\" FROM \"Doctor\" WHERE \"DoctorId\" = @Id",
                        new { Id = appointment.DoctorId });
                        
                    if (appointment.Doctor != null)
                    {
                        if (appointment.Doctor.UserId > 0)
                        {
                            appointment.Doctor.User = connection.QuerySingleOrDefault<User>(
                                "SELECT \"UserId\", \"Name\", \"LastName\", \"Username\", \"Email\", \"Password\", \"Cpf\", \"Phone\", \"BirthDate\", \"Role\" FROM \"Users\" WHERE \"UserId\" = @Id",
                                new { Id = appointment.Doctor.UserId });
                        }
                        
                        if (appointment.Doctor.SpecialtyId > 0)
                        {
                            appointment.Doctor.Specialty = connection.QuerySingleOrDefault<Specialty>(
                                "SELECT \"SpecialtyId\", \"Description\" FROM \"Specialty\" WHERE \"SpecialtyId\" = @Id",
                                new { Id = appointment.Doctor.SpecialtyId });
                        }
                    }
                }
            }
            
            return appointments;
        }

        public List<Appointment> GetByDoctorId(int doctorId)
        {
            using var connection = GetConnection();
            var sql = File.ReadAllText("Queries/GetAppointmentsByDoctorId.sql");
            
            var appointments = connection.Query<Appointment>(sql, new { DoctorId = doctorId }).ToList();
            
            foreach (var appointment in appointments)
            {
                if (appointment.PatientId > 0)
                {
                    appointment.Patient = connection.QuerySingleOrDefault<Patient>(
                        "SELECT \"PatientId\", \"UserId\" FROM \"Patient\" WHERE \"PatientId\" = @Id",
                        new { Id = appointment.PatientId });
                        
                    if (appointment.Patient != null && appointment.Patient.UserId > 0)
                    {
                        appointment.Patient.User = connection.QuerySingleOrDefault<User>(
                            "SELECT \"UserId\", \"Name\", \"LastName\", \"Username\", \"Email\", \"Password\", \"Cpf\", \"Phone\", \"BirthDate\", \"Role\" FROM \"Users\" WHERE \"UserId\" = @Id",
                            new { Id = appointment.Patient.UserId });
                    }
                }
                
                if (appointment.DoctorId > 0)
                {
                    appointment.Doctor = connection.QuerySingleOrDefault<Doctor>(
                        "SELECT \"DoctorId\", \"CRM\", \"UserId\", \"SpecialtyId\" FROM \"Doctor\" WHERE \"DoctorId\" = @Id",
                        new { Id = appointment.DoctorId });
                        
                    if (appointment.Doctor != null)
                    {
                        if (appointment.Doctor.UserId > 0)
                        {
                            appointment.Doctor.User = connection.QuerySingleOrDefault<User>(
                                "SELECT \"UserId\", \"Name\", \"LastName\", \"Username\", \"Email\", \"Password\", \"Cpf\", \"Phone\", \"BirthDate\", \"Role\" FROM \"Users\" WHERE \"UserId\" = @Id",
                                new { Id = appointment.Doctor.UserId });
                        }
                        
                        if (appointment.Doctor.SpecialtyId > 0)
                        {
                            appointment.Doctor.Specialty = connection.QuerySingleOrDefault<Specialty>(
                                "SELECT \"SpecialtyId\", \"Description\" FROM \"Specialty\" WHERE \"SpecialtyId\" = @Id",
                                new { Id = appointment.Doctor.SpecialtyId });
                        }
                    }
                }
            }
            
            return appointments;
        }

        public List<Appointment> GetAvailableForPayment()
        {
            using var connection = GetConnection();
            var sql = File.ReadAllText("Queries/GetAvailableAppointmentsForPayment.sql");
            
            var appointments = connection.Query<Appointment>(sql).ToList();
            
            foreach (var appointment in appointments)
            {
                if (appointment.PatientId > 0)
                {
                    appointment.Patient = connection.QuerySingleOrDefault<Patient>(
                        "SELECT \"PatientId\", \"UserId\" FROM \"Patient\" WHERE \"PatientId\" = @Id",
                        new { Id = appointment.PatientId });
                        
                    if (appointment.Patient != null && appointment.Patient.UserId > 0)
                    {
                        appointment.Patient.User = connection.QuerySingleOrDefault<User>(
                            "SELECT \"UserId\", \"Name\", \"LastName\", \"Username\", \"Email\", \"Password\", \"Cpf\", \"Phone\", \"BirthDate\", \"Role\" FROM \"Users\" WHERE \"UserId\" = @Id",
                            new { Id = appointment.Patient.UserId });
                    }
                }
            }
            
            return appointments;
        }

        public PagedListDto<AppointmentDto> GetPaged(int pageNumber, int pageSize, string? search = null)
        {
            using var connection = GetConnection();
            
            var countSql = File.ReadAllText("Queries/GetPagedAppointmentsCount.sql");
            var dataSql = File.ReadAllText("Queries/GetPagedAppointments.sql");
            
            var parameters = new
            {
                Search = search,
                PageSize = pageSize,
                Offset = (pageNumber - 1) * pageSize
            };
            
            var totalCount = connection.QuerySingle<int>(countSql, parameters);
            var totalPages = (int)Math.Ceiling(totalCount / (double)pageSize);
            
            var items = connection.Query<AppointmentDto>(dataSql, parameters).ToList();
            
            return new PagedListDto<AppointmentDto>
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
