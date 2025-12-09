SELECT COUNT(*)
FROM "Doctor" d
LEFT JOIN "Users" u ON d."UserId" = u."UserId"
LEFT JOIN "Specialty" s ON d."SpecialtyId" = s."SpecialtyId"
WHERE (@Search IS NULL OR @Search = '' OR
    u."Name" ILIKE '%' || @Search || '%' OR
    u."LastName" ILIKE '%' || @Search || '%' OR
    u."Email" ILIKE '%' || @Search || '%' OR
    u."Cpf" ILIKE '%' || @Search || '%' OR
    d."CRM" ILIKE '%' || @Search || '%' OR
    s."Description" ILIKE '%' || @Search || '%');


