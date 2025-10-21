import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';
import { AppointmentDto } from '../models/AppointmentDto';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(
    private http: HttpService
  ) { }

  public controller = "Appointment";
  private readonly baseUrl = 'https://localhost:7055/';

  // GET /Appointment - Get all appointments
  getAllAppointments(): Observable<any[]> {
    return this.http.get(`${this.controller}`);
  }

  // GET /Appointment/{id} - Get appointment by ID
  getAppointmentById(id: number): Observable<any> {
    return this.http.get(`${this.controller}/${id}`);
  }

  // GET /Appointment/patient/{patientId} - Get appointments by patient ID
  getAppointmentsByPatientId(patientId: number): Observable<any[]> {
    return this.http.get(`${this.controller}/patient/${patientId}`);
  }

  // GET /Appointment/doctor/{doctorId} - Get appointments by doctor ID
  getAppointmentsByDoctorId(doctorId: number): Observable<any[]> {
    return this.http.get(`${this.controller}/doctor/${doctorId}`);
  }

  // POST /Appointment - Create new appointment
  createAppointment(appointmentData: AppointmentDto): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      this.http.post(`${this.controller}`, appointmentData).subscribe(
        (response: any) => {
          console.log('Appointment created:', response);
          observer.next(true);
          observer.complete();
        },
        (error) => {
          console.error('Erro ao criar agendamento', error);
          observer.next(false);
          observer.complete();
        }
      );
    });
  }

  // PUT /Appointment/{id} - Update appointment
  updateAppointment(id: number, appointmentData: AppointmentDto): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      this.http.put(`${this.controller}/${id}`, appointmentData).subscribe(
        (response: any) => {
          console.log('Appointment updated:', response);
          observer.next(true);
          observer.complete();
        },
        (error) => {
          console.error('Erro ao atualizar agendamento', error);
          observer.next(false);
          observer.complete();
        }
      );
    });
  }

  // DELETE /Appointment/{id} - Delete appointment
  deleteAppointment(id: number): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      this.http.delete(`${this.controller}/${id}`).subscribe(
        (response: any) => {
          console.log('Appointment deleted:', response);
          observer.next(true);
          observer.complete();
        },
        (error) => {
          console.error('Erro ao excluir agendamento', error);
          observer.next(false);
          observer.complete();
        }
      );
    });
  }
}