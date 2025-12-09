INSERT INTO "Doctor" ("CRM", "UserId", "SpecialtyId")
VALUES (@CRM, @UserId, @SpecialtyId)
RETURNING "DoctorId";


