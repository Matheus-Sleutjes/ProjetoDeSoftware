import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { PagedList } from '../shared/table/table.models';
import { PaymentDto } from '../models/PaymentDto';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  public controller = 'Payment';

  constructor(
    private http: HttpService
  ) { }

  getPaymentById(id: number): Promise<any> {
    return this.http.get<any>(`${this.controller}/${id}`);
  }

  pagination(pagedList: PagedList<any>): Promise<any> {
    return this.http.post<any>(`${this.controller}/Pagination`, pagedList);
  }

  createPayment(paymentData: PaymentDto): Promise<boolean> {
    return this.http.post<any>(`${this.controller}`, paymentData)
      .then(() => true);
  }

  updatePayment(id: number, paymentData: PaymentDto): Promise<boolean> {
    return this.http.put<any>(`${this.controller}/${id}`, paymentData)
      .then(() => true);
  }

  deletePayment(id: number): Promise<boolean> {
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


