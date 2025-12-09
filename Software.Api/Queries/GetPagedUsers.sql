SELECT 
    "UserId",
    "Name" || ' ' || "LastName" AS "Name",
    "LastName",
    "Username",
    "Email",
    "Role",
    "Cpf"
FROM "Users"
WHERE (@Search IS NULL OR @Search = '' OR
    "Name" ILIKE '%' || @Search || '%' OR
    "LastName" ILIKE '%' || @Search || '%' OR
    "Email" ILIKE '%' || @Search || '%' OR
    "Username" ILIKE '%' || @Search || '%' OR
    "Cpf" ILIKE '%' || @Search || '%')
ORDER BY "Name"
LIMIT @PageSize OFFSET @Offset;


