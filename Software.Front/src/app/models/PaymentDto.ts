export interface PaymentDto {
  paymentId?: number;
  paymentDate: Date | string;
  paymentMethodId: number;
  userId: number;
   appointmentId: number;
  paymentMethodDescription?: string;
  userName?: string;
}


