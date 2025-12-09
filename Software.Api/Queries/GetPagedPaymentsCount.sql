SELECT COUNT(*)
FROM "Payment" p
LEFT JOIN "PaymentMethod" pm ON p."PaymentMethodId" = pm."PaymentMethodId"
LEFT JOIN "Users" u ON p."UserId" = u."UserId"
LEFT JOIN "Appointment" a ON p."AppointmentId" = a."AppointmentId"
LEFT JOIN "Patient" pt ON a."PatientId" = pt."PatientId"
LEFT JOIN "Users" ptu ON pt."UserId" = ptu."UserId"
LEFT JOIN "Doctor" d ON a."DoctorId" = d."DoctorId"
LEFT JOIN "Users" du ON d."UserId" = du."UserId"
WHERE (@Search IS NULL OR @Search = '' OR
    pm."Description" ILIKE '%' || @Search || '%' OR
    (u."Name" || ' ' || u."LastName") ILIKE '%' || @Search || '%' OR
    (ptu."Name" || ' ' || ptu."LastName") ILIKE '%' || @Search || '%' OR
    (du."Name" || ' ' || du."LastName") ILIKE '%' || @Search || '%');


