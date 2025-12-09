SELECT COUNT(*)
FROM "PaymentMethod"
WHERE (@Search IS NULL OR @Search = '' OR
    "Description" ILIKE '%' || @Search || '%');


