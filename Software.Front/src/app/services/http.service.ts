import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private readonly baseUrl = 'https://localhost:7265/api'; // URL base da sua API

  constructor(private http: HttpClient) {}
// Método para obter os headers com o token
private getHeaders(): HttpHeaders {
  const token = sessionStorage.getItem('token'); // Obtém o token da sessão
  let headers = new HttpHeaders().set('Content-Type', 'application/json');

  if (token) {
    headers = headers.set('Authorization', `Bearer ${token}`);
  }

  return headers;
}

// Método genérico para requisições GET
get(endpoint: string, params?: any): Observable<any> {
  return this.http.get<any>(`${this.baseUrl}/${endpoint}`, { params, headers: this.getHeaders() });
}

// Método genérico para requisições POST
post(endpoint: string, body: any): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}/${endpoint}`, body, { headers: this.getHeaders() });
}

// Método genérico para requisições PUT
put(endpoint: string, body: any): Observable<any> {
  return this.http.put<any>(`${this.baseUrl}/${endpoint}`, body, { headers: this.getHeaders() });
}

// Método genérico para requisições DELETE
delete(endpoint: string): Observable<any> {
  return this.http.delete<any>(`${this.baseUrl}/${endpoint}`, { headers: this.getHeaders() });
}
}
