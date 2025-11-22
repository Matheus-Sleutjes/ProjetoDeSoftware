import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { PagedList } from '../shared/table/table.models';
import { PaymentMethodDto } from '../models/PaymentMethodDto';

@Injectable({
  providedIn: 'root'
})
export class PaymentMethodService {

  public controller = 'PaymentMethod';

  constructor(
    private http: HttpService
  ) { }

  getAllPaymentMethods(): Promise<any[]> {
    return this.http.get<any[]>(`${this.controller}`);
  }

  getPaymentMethodById(id: number): Promise<any> {
    return this.http.get<any>(`${this.controller}/${id}`);
  }

  pagination(pagedList: PagedList<any>): Promise<any> {
    return this.http.post<any>(`${this.controller}/Pagination`, pagedList);
  }

  createPaymentMethod(methodData: PaymentMethodDto): Promise<boolean> {
    return this.http.post<any>(`${this.controller}`, methodData)
      .then(() => true);
  }

  updatePaymentMethod(id: number, methodData: PaymentMethodDto): Promise<boolean> {
    return this.http.put<any>(`${this.controller}/${id}`, methodData)
      .then(() => true);
  }

  deletePaymentMethod(id: number): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.http.delete(`${this.controller}/${id}`).then(
        () => {
          resolve(true);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
}


