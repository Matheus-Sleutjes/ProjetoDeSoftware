SELECT 
    "PaymentId",
    "PaymentDate",
    "PaymentMethodId",
    "UserId",
    "AppointmentId"
FROM "Payment"
WHERE "PaymentId" = @PaymentId;


