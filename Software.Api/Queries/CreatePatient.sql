INSERT INTO "Patient" ("UserId")
VALUES (@UserId)
RETURNING "PatientId";


