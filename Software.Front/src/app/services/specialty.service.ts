import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { SpecialtyDto } from '../models/SpecialtyDto';
import { PagedList } from '../shared/table/table.models';

@Injectable({
  providedIn: 'root'
})
export class SpecialtyService {

  constructor(
    private http: HttpService
  ) { }

  public controller = "Specialty";

  getAllSpecialties(): Promise<any[]> {
    return this.http.get<any[]>(`${this.controller}`);
  }

  getSpecialtyById(id: number): Promise<any> {
    return this.http.get<any>(`${this.controller}/${id}`);
  }

  pagination(pagedList: PagedList<any>): Promise<any> {
    return this.http.post<any>(`${this.controller}/Pagination`, pagedList);
  }

  createSpecialty(specialtyData: SpecialtyDto): Promise<boolean> {
    return this.http.post<any>(`${this.controller}`, specialtyData)
      .then(() => true);
  }

  updateSpecialty(id: number, specialtyData: SpecialtyDto): Promise<boolean> {
    return this.http.put<any>(`${this.controller}/${id}`, specialtyData)
      .then(() => true);
  }

  deleteSpecialty(id: number): Promise<boolean> {
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
