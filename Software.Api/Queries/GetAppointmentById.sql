SELECT 
    "AppointmentId",
    "AppointmentDate",
    "Description",
    "Status",
    "PatientId",
    "DoctorId",
    "CreatedAt",
    "UpdatedAt"
FROM "Appointment"
WHERE "AppointmentId" = @AppointmentId;


