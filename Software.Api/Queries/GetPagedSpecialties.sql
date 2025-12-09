SELECT 
    s."SpecialtyId",
    s."Description",
    s."Description" AS "Name",
    (SELECT COUNT(*) FROM "Doctor" d WHERE d."SpecialtyId" = s."SpecialtyId") AS "DoctorCount"
FROM "Specialty" s
WHERE (@Search IS NULL OR @Search = '' OR
    s."Description" ILIKE '%' || @Search || '%')
ORDER BY s."Description"
LIMIT @PageSize OFFSET @Offset;


