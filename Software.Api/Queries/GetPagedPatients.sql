SELECT 
    p."PatientId",
    p."UserId",
    COALESCE(u."Name" || ' ' || u."LastName", '') AS "Name",
    COALESCE(u."Email", '') AS "Email",
    COALESCE(u."Cpf", '') AS "Cpf",
    '' AS "Phone",
    NULL AS "BirthDate"
FROM "Patient" p
LEFT JOIN "Users" u ON p."UserId" = u."UserId"
WHERE (@Search IS NULL OR @Search = '' OR
    u."Name" ILIKE '%' || @Search || '%' OR
    u."LastName" ILIKE '%' || @Search || '%' OR
    u."Email" ILIKE '%' || @Search || '%' OR
    u."Cpf" ILIKE '%' || @Search || '%')
ORDER BY u."Name"
LIMIT @PageSize OFFSET @Offset;


