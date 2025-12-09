INSERT INTO "Appointment" ("AppointmentDate", "Description", "Status", "PatientId", "DoctorId", "CreatedAt", "UpdatedAt")
VALUES (@AppointmentDate, @Description, @Status, @PatientId, @DoctorId, @CreatedAt, @UpdatedAt)
RETURNING "AppointmentId";


