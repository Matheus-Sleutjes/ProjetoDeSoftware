UPDATE "Payment"
SET "PaymentDate" = @PaymentDate,
    "PaymentMethodId" = @PaymentMethodId,
    "UserId" = @UserId,
    "AppointmentId" = @AppointmentId
WHERE "PaymentId" = @PaymentId;


