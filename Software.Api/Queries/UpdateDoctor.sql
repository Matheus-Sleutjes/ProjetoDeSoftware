UPDATE "Doctor"
SET "CRM" = @CRM,
    "UserId" = @UserId,
    "SpecialtyId" = @SpecialtyId
WHERE "DoctorId" = @DoctorId;


