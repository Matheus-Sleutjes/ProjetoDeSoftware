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
WHERE "DoctorId" = @DoctorId
ORDER BY "AppointmentDate" DESC;


