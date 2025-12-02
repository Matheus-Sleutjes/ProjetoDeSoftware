import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { AppointmentDto } from '../models/AppointmentDto';
import { PagedList } from '../shared/table/table.models';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(
    private http: HttpService
  ) { }

  public controller = "Appointment";

  getAvailableForPayment(): Promise<any[]> {
    return this.http.get<any[]>(`${this.controller}/available-for-payment`);
  }

  getAppointmentById(id: number): Promise<any> {
    return this.http.get<any>(`${this.controller}/${id}`);
  }

  pagination(pagedList: PagedList<any>): Promise<any> {
    return this.http.post<any>(`${this.controller}/Pagination`, pagedList);
  }

  createAppointment(appointmentData: AppointmentDto): Promise<boolean> {
    return this.http.post<any>(`${this.controller}`, appointmentData)
      .then(() => true);
  }

  updateAppointment(id: number, appointmentData: AppointmentDto): Promise<boolean> {
    return this.http.put<any>(`${this.controller}/${id}`, appointmentData)
      .then(() => true);
  }

  deleteAppointment(id: number): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.http.delete(`${this.controller}/${id}`).then(
        (response: any) => {
          resolve(true);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
}