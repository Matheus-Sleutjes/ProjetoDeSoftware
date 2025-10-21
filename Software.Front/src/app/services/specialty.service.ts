import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';
import { SpecialtyDto } from '../models/SpecialtyDto';

@Injectable({
  providedIn: 'root'
})
export class SpecialtyService {

  constructor(
    private http: HttpService
  ) { }

  public controller = "Specialty";
  private readonly baseUrl = 'https://localhost:7055/';

  // GET /Specialty - Get all specialties
  getAllSpecialties(): Observable<any[]> {
    return this.http.get(`${this.controller}`);
  }

  // POST /Specialty - Create new specialty
  createSpecialty(specialtyData: SpecialtyDto): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      this.http.post(`${this.controller}`, specialtyData).subscribe(
        (response: any) => {
          console.log('Specialty created:', response);
          observer.next(true);
          observer.complete();
        },
        (error) => {
          console.error('Erro ao criar especialidade', error);
          observer.next(false);
          observer.complete();
        }
      );
    });
  }

  // DELETE /Specialty/{id} - Delete specialty
  deleteSpecialty(id: number): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      this.http.delete(`${this.controller}/${id}`).subscribe(
        (response: any) => {
          console.log('Specialty deleted:', response);
          observer.next(true);
          observer.complete();
        },
        (error) => {
          console.error('Erro ao excluir especialidade', error);
          observer.next(false);
          observer.complete();
        }
      );
    });
  }
}
