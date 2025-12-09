SELECT 
    "PaymentMethodId",
    "Description"
FROM "PaymentMethod"
WHERE (@Search IS NULL OR @Search = '' OR
    "Description" ILIKE '%' || @Search || '%')
ORDER BY "Description"
LIMIT @PageSize OFFSET @Offset;


