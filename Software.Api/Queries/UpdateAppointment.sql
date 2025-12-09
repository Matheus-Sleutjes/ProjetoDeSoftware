UPDATE "Appointment"
SET "AppointmentDate" = @AppointmentDate,
    "Description" = @Description,
    "Status" = @Status,
    "PatientId" = @PatientId,
    "DoctorId" = @DoctorId,
    "UpdatedAt" = @UpdatedAt
WHERE "AppointmentId" = @AppointmentId;


