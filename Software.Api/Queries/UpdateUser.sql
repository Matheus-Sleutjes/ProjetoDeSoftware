UPDATE "Users"
SET "Name" = @Name,
    "LastName" = @LastName,
    "Username" = @Username,
    "Email" = @Email,
    "Password" = @Password,
    "Cpf" = @Cpf,
    "Phone" = @Phone,
    "BirthDate" = @BirthDate,
    "Role" = @Role
WHERE "UserId" = @UserId;


