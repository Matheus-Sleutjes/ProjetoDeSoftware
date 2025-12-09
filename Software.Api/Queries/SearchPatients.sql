SELECT 
    p."PatientId",
    p."UserId",
    u."UserId" AS "UserUserId",
    u."Name",
    u."LastName",
    u."Username",
    u."Email",
    u."Password",
    u."Cpf",
    u."Phone",
    u."BirthDate",
    u."Role"
FROM "Patient" p
LEFT JOIN "Users" u ON p."UserId" = u."UserId"
WHERE (@Term IS NULL OR @Term = '' OR
    u."Name" ILIKE '%' || @Term || '%' OR
    u."LastName" ILIKE '%' || @Term || '%' OR
    u."Email" ILIKE '%' || @Term || '%' OR
    u."Cpf" ILIKE '%' || @Term || '%')
ORDER BY u."Name";


