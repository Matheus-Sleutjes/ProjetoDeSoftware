export interface Appointment {
    id?: string;
    patientId: number;
    doctorId: number;
    appointmentDate: string;
    description: string;
    // time: string;
    status: number; // 1: Confirmada, 2: Cancelada, 3: Concluída3
}

export interface TimeSlot {
    time: string;
    available: boolean;
}

export interface NotificationPreference {
    userId: string;
    email: boolean;
    push: boolean;
    reminderTimes: number[]; // Horas antes da consulta (ex: 24, 1)
  }