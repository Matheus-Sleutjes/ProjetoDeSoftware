SELECT COUNT(*)
FROM "Patient" p
LEFT JOIN "Users" u ON p."UserId" = u."UserId"
WHERE (@Search IS NULL OR @Search = '' OR
    u."Name" ILIKE '%' || @Search || '%' OR
    u."LastName" ILIKE '%' || @Search || '%' OR
    u."Email" ILIKE '%' || @Search || '%' OR
    u."Cpf" ILIKE '%' || @Search || '%');


