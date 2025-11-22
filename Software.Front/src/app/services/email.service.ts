import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private readonly baseEndpoint = 'api/Email';

  constructor(
    private http: HttpService
  ) { }

  sendTestEmail(to: string): Promise<any> {
    const endpoint = `${this.baseEndpoint}/enviar?para=${encodeURIComponent(to)}`;
    return this.http.post<any>(endpoint, {});
  }
}


