using Dapper;
using Npgsql;
using Software.Domain.Dtos;
using Software.Domain.Models;
using Software.Infraestructure.Contracts;
using System.Data;

namespace Software.Infraestructure.Repository
{
    public class PaymentRepository : IPaymentRepository
    {
        private IDbConnection GetConnection() => new NpgsqlConnection(DatabaseConfig.ConnectionString);

        public bool Create(Payment payment)
        {
            using var connection = GetConnection();
            var sql = File.ReadAllText("Queries/CreatePayment.sql");
            
            var paymentId = connection.QuerySingle<int>(sql, new
            {
                PaymentDate = payment.PaymentDate,
                PaymentMethodId = payment.PaymentMethodId,
                UserId = payment.UserId,
                AppointmentId = payment.AppointmentId
            });
            
            payment.PaymentId = paymentId;
            return true;
        }

        public bool Delete(Payment payment)
        {
            using var connection = GetConnection();
            var sql = File.ReadAllText("Queries/DeletePayment.sql");
            
            var rowsAffected = connection.Execute(sql, new { PaymentId = payment.PaymentId });
            return rowsAffected > 0;
        }

        public bool Update(Payment payment)
        {
            using var connection = GetConnection();
            var sql = File.ReadAllText("Queries/UpdatePayment.sql");
            
            var rowsAffected = connection.Execute(sql, new
            {
                PaymentId = payment.PaymentId,
                PaymentDate = payment.PaymentDate,
                PaymentMethodId = payment.PaymentMethodId,
                UserId = payment.UserId,
                AppointmentId = payment.AppointmentId
            });
            
            return rowsAffected > 0;
        }

        public List<Payment> GetAll()
        {
            using var connection = GetConnection();
            var sql = File.ReadAllText("Queries/GetAllPayments.sql");
            var paymentMethodSql = File.ReadAllText("Queries/GetPaymentMethodById.sql");
            var userSql = File.ReadAllText("Queries/GetUserById.sql");
            var appointmentSql = File.ReadAllText("Queries/GetAppointmentById.sql");
            var patientSql = File.ReadAllText("Queries/GetPatientById.sql");
            var doctorSql = File.ReadAllText("Queries/GetDoctorById.sql");
            
            var payments = connection.Query<Payment>(sql).ToList();
            
            foreach (var payment in payments)
            {
                if (payment.PaymentMethodId > 0)
                {
                    payment.PaymentMethod = connection.QuerySingleOrDefault<PaymentMethod>(paymentMethodSql, new { PaymentMethodId = payment.PaymentMethodId });
                }
                
                if (payment.UserId > 0)
                {
                    payment.User = connection.QuerySingleOrDefault<User>(userSql, new { UserId = payment.UserId });
                }
                
                if (payment.AppointmentId > 0)
                {
                    payment.Appointment = connection.QuerySingleOrDefault<Appointment>(appointmentSql, new { AppointmentId = payment.AppointmentId });
                    
                    if (payment.Appointment != null)
                    {
                        if (payment.Appointment.PatientId > 0)
                        {
                            payment.Appointment.Patient = connection.QuerySingleOrDefault<Patient>(patientSql, new { PatientId = payment.Appointment.PatientId });
                        }
                        
                        if (payment.Appointment.DoctorId > 0)
                        {
                            payment.Appointment.Doctor = connection.QuerySingleOrDefault<Doctor>(doctorSql, new { DoctorId = payment.Appointment.DoctorId });
                        }
                    }
                }
            }
            
            return payments;
        }

        public Payment? GetById(int id)
        {
            using var connection = GetConnection();
            var sql = File.ReadAllText("Queries/GetPaymentById.sql");
            var paymentMethodSql = File.ReadAllText("Queries/GetPaymentMethodById.sql");
            var userSql = File.ReadAllText("Queries/GetUserById.sql");
            var appointmentSql = File.ReadAllText("Queries/GetAppointmentById.sql");
            var patientSql = File.ReadAllText("Queries/GetPatientById.sql");
            var doctorSql = File.ReadAllText("Queries/GetDoctorById.sql");
            
            var payment = connection.QuerySingleOrDefault<Payment>(sql, new { PaymentId = id });
            
            if (payment == null) return null;
            
            if (payment.PaymentMethodId > 0)
            {
                payment.PaymentMethod = connection.QuerySingleOrDefault<PaymentMethod>(paymentMethodSql, new { PaymentMethodId = payment.PaymentMethodId });
            }
            
            if (payment.UserId > 0)
            {
                payment.User = connection.QuerySingleOrDefault<User>(userSql, new { UserId = payment.UserId });
            }
            
            if (payment.AppointmentId > 0)
            {
                payment.Appointment = connection.QuerySingleOrDefault<Appointment>(appointmentSql, new { AppointmentId = payment.AppointmentId });
                
                if (payment.Appointment != null)
                {
                    if (payment.Appointment.PatientId > 0)
                    {
                        payment.Appointment.Patient = connection.QuerySingleOrDefault<Patient>(patientSql, new { PatientId = payment.Appointment.PatientId });
                    }
                    
                    if (payment.Appointment.DoctorId > 0)
                    {
                        payment.Appointment.Doctor = connection.QuerySingleOrDefault<Doctor>(doctorSql, new { DoctorId = payment.Appointment.DoctorId });
                    }
                }
            }
            
            return payment;
        }

        public PagedListDto<PaymentDto> GetPaged(int pageNumber, int pageSize, string? search = null)
        {
            using var connection = GetConnection();
            
            var countSql = File.ReadAllText("Queries/GetPagedPaymentsCount.sql");
            var dataSql = File.ReadAllText("Queries/GetPagedPayments.sql");
            
            var parameters = new
            {
                Search = search,
                PageSize = pageSize,
                Offset = (pageNumber - 1) * pageSize
            };
            
            var totalCount = connection.QuerySingle<int>(countSql, parameters);
            var totalPages = (int)Math.Ceiling(totalCount / (double)pageSize);
            
            var items = connection.Query<PaymentDto>(dataSql, parameters).ToList();
            
            return new PagedListDto<PaymentDto>
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
