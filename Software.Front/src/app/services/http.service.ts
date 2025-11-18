import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private readonly baseUrl = 'https://localhost:7055'; // URL base da sua API
  private readonly controller = 'Authentication'; // Controller padrão
  constructor(private http: HttpClient) { }
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
  get<T>(endpoint: string, params?: any): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this.http.get<T>(`${this.baseUrl}/${endpoint}`, { params, headers: this.getHeaders() }).subscribe(
        result => {
          resolve(result);
        },
        error => reject(error)
      );
    });
  }

  getNotController<T>(endpoint: string, params?: any): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this.http.get<T>(`${this.baseUrl}/${endpoint}`, { params, headers: this.getHeaders() }).subscribe(
        result => {
          resolve(result);
        },
        error => reject(error)
      );
    });
  }

  // Método genérico para requisições POST
  post<T>(endpoint: string, body: any): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this.http.post<T>(`${this.baseUrl}/${endpoint}`, body, { headers: this.getHeaders() }).subscribe(
        result => {
          resolve(result);
        },
        error => reject(error)
      );
    });
  }

  // Método genérico para requisições PUT
  put<T>(id: string, body: {}): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this.http.put<T>(`${this.baseUrl}/${id}`, body, { headers: this.getHeaders() }).subscribe(
        result => {
          resolve(result);
        },
        error => reject(error)
      );
    });
  }

  // Método genérico para requisições DELETE
  delete<T>(id: string): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this.http.delete<T>(`${this.baseUrl}/${id}`, { headers: this.getHeaders() }).subscribe(
        result => {
          resolve(result);
        },
        error => reject(error)
      );
    });
  }
}
