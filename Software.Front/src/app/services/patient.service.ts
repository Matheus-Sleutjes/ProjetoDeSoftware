import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { PatientDto } from '../models/PatientDto';
import { PagedList } from '../shared/table/table.models';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(
    private http: HttpService
  ) { }

  public controller = "Patient";

  getAllPatients(): Promise<any[]> {
    return this.http.get<any[]>(`${this.controller}`);
  }

  searchPatients(term?: string): Promise<any[]> {
    const params = term ? { term } : {};
    return this.http.get<any[]>(`${this.controller}/search`, params);
  }

  getPatientById(id: number): Promise<any> {
    return this.http.get<any>(`${this.controller}/${id}`);
  }

  pagination(pagedList: PagedList<any>): Promise<any> {
    return this.http.post<any>(`${this.controller}/Pagination`, pagedList);
  }

  createPatient(patientData: PatientDto): Promise<boolean> {
    return this.http.post<any>(`${this.controller}`, patientData)
      .then(() => true);
  }

  updatePatient(id: number, patientData: PatientDto): Promise<boolean> {
    return this.http.put<any>(`${this.controller}/${id}`, patientData)
      .then(() => true);
  }

  deletePatient(id: number): Promise<boolean> {
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
