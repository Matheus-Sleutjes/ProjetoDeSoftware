export interface AppointmentDto {
  appointmentId: number;
  patientId: number;
  doctorId: number;
  appointmentDate: Date;
  description: string;
  status: number; // AppointmentStatus enum
  createdAt: Date;
  updatedAt?: Date;
}
