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
WHERE "PatientId" = @PatientId
ORDER BY "AppointmentDate" DESC;


