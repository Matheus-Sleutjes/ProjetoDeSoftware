import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { DoctorDto } from '../models/DoctorDto';
import { PagedList } from '../shared/table/table.models';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(
    private http: HttpService
  ) { }

  public controller = "Doctor";

  getAllDoctors(): Promise<any[]> {
    return this.http.get<any[]>(`${this.controller}`);
  }

  searchDoctors(term?: string): Promise<any[]> {
    const pagedList: PagedList<any> = {
      items: [],
      pageNumber: 1,
      pageSize: 50,
      totalPages: 1,
      search: term || ''
    };

    return this.pagination(pagedList).then(response => response.items || []);
  }

  getDoctorById(id: number): Promise<any> {
    return this.http.get<any>(`${this.controller}/${id}`);
  }

  pagination(pagedList: PagedList<any>): Promise<any> {
    return this.http.post<any>(`${this.controller}/Pagination`, pagedList);
  }

  createDoctor(doctorData: DoctorDto): Promise<boolean> {
    return this.http.post<any>(`${this.controller}`, doctorData)
      .then(() => true);
  }

  updateDoctor(id: number, doctorData: DoctorDto): Promise<boolean> {
    return this.http.put<any>(`${this.controller}/${id}`, doctorData)
      .then(() => true);
  }

  deleteDoctor(id: number): Promise<boolean> {
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
