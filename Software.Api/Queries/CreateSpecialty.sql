INSERT INTO "Specialty" ("Description")
VALUES (@Description)
RETURNING "SpecialtyId";


