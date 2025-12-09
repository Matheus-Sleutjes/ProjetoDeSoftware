SELECT COUNT(*)
FROM "Specialty"
WHERE (@Search IS NULL OR @Search = '' OR
    "Description" ILIKE '%' || @Search || '%');


