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
WHERE NOT EXISTS (
    SELECT 1 
    FROM "Payment" p 
    WHERE p."AppointmentId" = "Appointment"."AppointmentId"
)
ORDER BY "AppointmentDate" ASC;


