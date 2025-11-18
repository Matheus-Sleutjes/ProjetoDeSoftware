export interface AppointmentDto {
  patientId: number;
  doctorId: number;
  appointmentDate: Date;
  description: string;
  status: number; // AppointmentStatus enum
  updatedAt?: Date;
}
