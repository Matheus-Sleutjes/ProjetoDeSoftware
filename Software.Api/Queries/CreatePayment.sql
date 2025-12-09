INSERT INTO "Payment" ("PaymentDate", "PaymentMethodId", "UserId", "AppointmentId")
VALUES (@PaymentDate, @PaymentMethodId, @UserId, @AppointmentId)
RETURNING "PaymentId";


