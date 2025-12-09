SELECT 
    "UserId",
    "Name",
    "LastName",
    "Username",
    "Email",
    "Role",
    "Cpf"
FROM "Users"
WHERE (@RoleId = 0 OR "Role" = @RoleId);


