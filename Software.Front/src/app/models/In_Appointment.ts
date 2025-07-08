export interface Appointment {
    id?: string;
    patientId: string;
    patientName: string;
    doctorId: string;
    doctorName: string;
    speciality: string;
    date: Date;
    time: string;
    status: 'Agendado' | 'Confirmar' | 'Cancelar' | 'Completo';
    notes?: string;
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