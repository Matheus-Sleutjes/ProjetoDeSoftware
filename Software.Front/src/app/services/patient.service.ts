import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';
import { PatientDto } from '../models/PatientDto';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(
    private http: HttpService
  ) { }

  public controller = "Patient";
  private readonly baseUrl = 'https://localhost:7055/';

  // GET /Patient - Get all patients
  getAllPatients(): Observable<any[]> {
    return this.http.get(`${this.controller}`);
  }

  // GET /Patient/{id} - Get patient by ID
  getPatientById(id: number): Observable<any> {
    return this.http.get(`${this.controller}/${id}`);
  }

  // POST /Patient - Create new patient
  createPatient(patientData: PatientDto): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      this.http.post(`${this.controller}`, patientData).subscribe(
        (response: any) => {
          console.log('Patient created:', response);
          observer.next(true);
          observer.complete();
        },
        (error) => {
          console.error('Erro ao criar paciente', error);
          observer.next(false);
          observer.complete();
        }
      );
    });
  }

  // PUT /Patient/{id} - Update patient
  updatePatient(id: number, patientData: PatientDto): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      this.http.put(`${this.controller}/${id}`, patientData).subscribe(
        (response: any) => {
          console.log('Patient updated:', response);
          observer.next(true);
          observer.complete();
        },
        (error) => {
          console.error('Erro ao atualizar paciente', error);
          observer.next(false);
          observer.complete();
        }
      );
    });
  }

  // DELETE /Patient/{id} - Delete patient
  deletePatient(id: number): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      this.http.delete(`${this.controller}/${id}`).subscribe(
        (response: any) => {
          console.log('Patient deleted:', response);
          observer.next(true);
          observer.complete();
        },
        (error) => {
          console.error('Erro ao excluir paciente', error);
          observer.next(false);
          observer.complete();
        }
      );
    });
  }
}
