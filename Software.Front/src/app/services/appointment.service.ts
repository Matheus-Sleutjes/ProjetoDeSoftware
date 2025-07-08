import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpService } from './http.service';
import { Appointment, NotificationPreference, TimeSlot } from '../models/In_Appointment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private readonly endpoint = 'Appointments';

  constructor(private http: HttpService) { }

  // Obter horários disponíveis para uma data específica e médico
  getAvailableTimeSlots(date: string, doctorId: string): Observable<TimeSlot[]> {
    return this.http.getNotController(`${this.endpoint}/available-slots?date=${date}&doctorId=${doctorId}`);
  }

  // Criar um novo agendamento
  createAppointment(appointment: Appointment): Observable<Appointment> {
    return this.http.post(this.endpoint, appointment);
  }

  // Obter agendamentos do paciente
  getPatientAppointments(patientId: string): Observable<Appointment[]> {
    return this.http.getNotController(`${this.endpoint}/patient/${patientId}`);
  }

  // Obter agendamentos do médico
  getDoctorAppointments(doctorId: string): Observable<Appointment[]> {
    return this.http.getNotController(`${this.endpoint}/doctor/${doctorId}`);
  }

  // Cancelar agendamento
  cancelAppointment(appointmentId: string): Observable<any> {
    return this.http.post(`${this.endpoint}/cancel/${appointmentId}`, {});
  }

  // Reagendar consulta
  rescheduleAppointment(appointmentId: string, newDate: string, newTime: string): Observable<Appointment> {
    return this.http.post(`${this.endpoint}/reschedule/${appointmentId}`, {
      date: newDate,
      time: newTime
    });
  }

  // Salvar preferências de notificação
  saveNotificationPreferences(preferences: NotificationPreference): Observable<NotificationPreference> {
    return this.http.post(`${this.endpoint}/notifications/preferences`, preferences);
  }

  // Obter preferências de notificação do usuário
  getNotificationPreferences(userId: string): Observable<NotificationPreference> {
    return this.http.getNotController(`${this.endpoint}/notifications/preferences/${userId}`);
  }
}