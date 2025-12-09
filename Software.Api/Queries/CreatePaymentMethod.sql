INSERT INTO "PaymentMethod" ("Description")
VALUES (@Description)
RETURNING "PaymentMethodId";


