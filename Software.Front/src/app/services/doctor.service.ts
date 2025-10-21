import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';
import { DoctorDto } from '../models/DoctorDto';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(
    private http: HttpService
  ) { }

  public controller = "Doctor";
  private readonly baseUrl = 'https://localhost:7055/';

  // GET /Doctor - Get all doctors
  getAllDoctors(): Observable<any[]> {
    return this.http.get(`${this.controller}`);
  }

  // GET /Doctor/{id} - Get doctor by ID
  getDoctorById(id: number): Observable<any> {
    return this.http.get(`${this.controller}/${id}`);
  }

  // POST /Doctor - Create new doctor
  createDoctor(doctorData: DoctorDto): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      this.http.post(`${this.controller}`, doctorData).subscribe(
        (response: any) => {
          console.log('Doctor created:', response);
          observer.next(true);
          observer.complete();
        },
        (error) => {
          console.error('Erro ao criar médico', error);
          observer.next(false);
          observer.complete();
        }
      );
    });
  }

  // PUT /Doctor/{id} - Update doctor
  updateDoctor(id: number, doctorData: DoctorDto): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      this.http.put(`${this.controller}/${id}`, doctorData).subscribe(
        (response: any) => {
          console.log('Doctor updated:', response);
          observer.next(true);
          observer.complete();
        },
        (error) => {
          console.error('Erro ao atualizar médico', error);
          observer.next(false);
          observer.complete();
        }
      );
    });
  }

  // DELETE /Doctor/{id} - Delete doctor
  deleteDoctor(id: number): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      this.http.delete(`${this.controller}/${id}`).subscribe(
        (response: any) => {
          console.log('Doctor deleted:', response);
          observer.next(true);
          observer.complete();
        },
        (error) => {
          console.error('Erro ao excluir médico', error);
          observer.next(false);
          observer.complete();
        }
      );
    });
  }
}
