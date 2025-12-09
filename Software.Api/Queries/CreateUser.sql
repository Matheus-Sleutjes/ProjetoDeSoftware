INSERT INTO "Users" ("Name", "LastName", "Username", "Email", "Password", "Cpf", "Phone", "BirthDate", "Role")
VALUES (@Name, @LastName, @Username, @Email, @Password, @Cpf, @Phone, @BirthDate, @Role)
RETURNING "UserId";


