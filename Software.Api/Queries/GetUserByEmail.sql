SELECT 
    "UserId",
    "Name",
    "LastName",
    "Username",
    "Email",
    "Password",
    "Cpf",
    "Phone",
    "BirthDate",
    "Role"
FROM "Users"
WHERE "Email" = @Email;


