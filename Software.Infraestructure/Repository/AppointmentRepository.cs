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
            var patientSql = File.ReadAllText("Queries/GetPatientById.sql");
            var doctorSql = File.ReadAllText("Queries/GetDoctorById.sql");
            var userSql = File.ReadAllText("Queries/GetUserById.sql");
            var specialtySql = File.ReadAllText("Queries/GetSpecialtyById.sql");
            
            var appointment = connection.QuerySingleOrDefault<Appointment>(sql, new { AppointmentId = id });
            
            if (appointment == null) return null;
            
            if (appointment.PatientId > 0)
            {
                appointment.Patient = connection.QuerySingleOrDefault<Patient>(patientSql, new { PatientId = appointment.PatientId });
                    
                if (appointment.Patient != null && appointment.Patient.UserId > 0)
                {
                    appointment.Patient.User = connection.QuerySingleOrDefault<User>(userSql, new { UserId = appointment.Patient.UserId });
                }
            }
            
            if (appointment.DoctorId > 0)
            {
                appointment.Doctor = connection.QuerySingleOrDefault<Doctor>(doctorSql, new { DoctorId = appointment.DoctorId });
                    
                if (appointment.Doctor != null)
                {
                    if (appointment.Doctor.UserId > 0)
                    {
                        appointment.Doctor.User = connection.QuerySingleOrDefault<User>(userSql, new { UserId = appointment.Doctor.UserId });
                    }
                    
                    if (appointment.Doctor.SpecialtyId > 0)
                    {
                        appointment.Doctor.Specialty = connection.QuerySingleOrDefault<Specialty>(specialtySql, new { SpecialtyId = appointment.Doctor.SpecialtyId });
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
                Status = (int)entity.Status,
                PatientId = entity.PatientId,
                DoctorId = entity.DoctorId,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
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
                Status = (int)entity.Status,
                PatientId = entity.PatientId,
                DoctorId = entity.DoctorId,
                UpdatedAt = DateTime.UtcNow,
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
            var patientSql = File.ReadAllText("Queries/GetPatientById.sql");
            var doctorSql = File.ReadAllText("Queries/GetDoctorById.sql");
            var userSql = File.ReadAllText("Queries/GetUserById.sql");
            var specialtySql = File.ReadAllText("Queries/GetSpecialtyById.sql");
            
            var appointments = connection.Query<Appointment>(sql).ToList();
            
            foreach (var appointment in appointments)
            {
                if (appointment.PatientId > 0)
                {
                    appointment.Patient = connection.QuerySingleOrDefault<Patient>(patientSql, new { PatientId = appointment.PatientId });
                        
                    if (appointment.Patient != null && appointment.Patient.UserId > 0)
                    {
                        appointment.Patient.User = connection.QuerySingleOrDefault<User>(userSql, new { UserId = appointment.Patient.UserId });
                    }
                }
                
                if (appointment.DoctorId > 0)
                {
                    appointment.Doctor = connection.QuerySingleOrDefault<Doctor>(doctorSql, new { DoctorId = appointment.DoctorId });
                        
                    if (appointment.Doctor != null)
                    {
                        if (appointment.Doctor.UserId > 0)
                        {
                            appointment.Doctor.User = connection.QuerySingleOrDefault<User>(userSql, new { UserId = appointment.Doctor.UserId });
                        }
                        
                        if (appointment.Doctor.SpecialtyId > 0)
                        {
                            appointment.Doctor.Specialty = connection.QuerySingleOrDefault<Specialty>(specialtySql, new { SpecialtyId = appointment.Doctor.SpecialtyId });
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
            var patientSql = File.ReadAllText("Queries/GetPatientById.sql");
            var doctorSql = File.ReadAllText("Queries/GetDoctorById.sql");
            var userSql = File.ReadAllText("Queries/GetUserById.sql");
            var specialtySql = File.ReadAllText("Queries/GetSpecialtyById.sql");
            
            var appointments = connection.Query<Appointment>(sql, new { PatientId = patientId }).ToList();
            
            foreach (var appointment in appointments)
            {
                if (appointment.PatientId > 0)
                {
                    appointment.Patient = connection.QuerySingleOrDefault<Patient>(patientSql, new { PatientId = appointment.PatientId });
                        
                    if (appointment.Patient != null && appointment.Patient.UserId > 0)
                    {
                        appointment.Patient.User = connection.QuerySingleOrDefault<User>(userSql, new { UserId = appointment.Patient.UserId });
                    }
                }
                
                if (appointment.DoctorId > 0)
                {
                    appointment.Doctor = connection.QuerySingleOrDefault<Doctor>(doctorSql, new { DoctorId = appointment.DoctorId });
                        
                    if (appointment.Doctor != null)
                    {
                        if (appointment.Doctor.UserId > 0)
                        {
                            appointment.Doctor.User = connection.QuerySingleOrDefault<User>(userSql, new { UserId = appointment.Doctor.UserId });
                        }
                        
                        if (appointment.Doctor.SpecialtyId > 0)
                        {
                            appointment.Doctor.Specialty = connection.QuerySingleOrDefault<Specialty>(specialtySql, new { SpecialtyId = appointment.Doctor.SpecialtyId });
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
            var patientSql = File.ReadAllText("Queries/GetPatientById.sql");
            var doctorSql = File.ReadAllText("Queries/GetDoctorById.sql");
            var userSql = File.ReadAllText("Queries/GetUserById.sql");
            var specialtySql = File.ReadAllText("Queries/GetSpecialtyById.sql");
            
            var appointments = connection.Query<Appointment>(sql, new { DoctorId = doctorId }).ToList();
            
            foreach (var appointment in appointments)
            {
                if (appointment.PatientId > 0)
                {
                    appointment.Patient = connection.QuerySingleOrDefault<Patient>(patientSql, new { PatientId = appointment.PatientId });
                        
                    if (appointment.Patient != null && appointment.Patient.UserId > 0)
                    {
                        appointment.Patient.User = connection.QuerySingleOrDefault<User>(userSql, new { UserId = appointment.Patient.UserId });
                    }
                }
                
                if (appointment.DoctorId > 0)
                {
                    appointment.Doctor = connection.QuerySingleOrDefault<Doctor>(doctorSql, new { DoctorId = appointment.DoctorId });
                        
                    if (appointment.Doctor != null)
                    {
                        if (appointment.Doctor.UserId > 0)
                        {
                            appointment.Doctor.User = connection.QuerySingleOrDefault<User>(userSql, new { UserId = appointment.Doctor.UserId });
                        }
                        
                        if (appointment.Doctor.SpecialtyId > 0)
                        {
                            appointment.Doctor.Specialty = connection.QuerySingleOrDefault<Specialty>(specialtySql, new { SpecialtyId = appointment.Doctor.SpecialtyId });
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
            var patientSql = File.ReadAllText("Queries/GetPatientById.sql");
            var userSql = File.ReadAllText("Queries/GetUserById.sql");
            
            var appointments = connection.Query<Appointment>(sql).ToList();
            
            foreach (var appointment in appointments)
            {
                if (appointment.PatientId > 0)
                {
                    appointment.Patient = connection.QuerySingleOrDefault<Patient>(patientSql, new { PatientId = appointment.PatientId });
                        
                    if (appointment.Patient != null && appointment.Patient.UserId > 0)
                    {
                        appointment.Patient.User = connection.QuerySingleOrDefault<User>(userSql, new { UserId = appointment.Patient.UserId });
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
