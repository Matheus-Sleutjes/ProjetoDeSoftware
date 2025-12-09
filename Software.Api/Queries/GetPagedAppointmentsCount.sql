SELECT COUNT(*)
FROM "Appointment" a
LEFT JOIN "Patient" pt ON a."PatientId" = pt."PatientId"
LEFT JOIN "Users" ptu ON pt."UserId" = ptu."UserId"
LEFT JOIN "Doctor" d ON a."DoctorId" = d."DoctorId"
LEFT JOIN "Users" du ON d."UserId" = du."UserId"
LEFT JOIN "Specialty" s ON d."SpecialtyId" = s."SpecialtyId"
WHERE (@Search IS NULL OR @Search = '' OR
    ptu."Name" ILIKE '%' || @Search || '%' OR
    ptu."LastName" ILIKE '%' || @Search || '%' OR
    ptu."Email" ILIKE '%' || @Search || '%' OR
    du."Name" ILIKE '%' || @Search || '%' OR
    du."LastName" ILIKE '%' || @Search || '%' OR
    d."CRM" ILIKE '%' || @Search || '%' OR
    s."Description" ILIKE '%' || @Search || '%' OR
    a."Description" ILIKE '%' || @Search || '%');


