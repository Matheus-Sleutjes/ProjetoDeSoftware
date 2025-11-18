import { Injectable } from '@angular/core';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { Router } from '@angular/router';
import { HttpService } from './http.service';
import { In_Login } from '../models/In_login';
import { In_CreateAccount } from '../models/In_createAccount';
import { PagedList } from '../shared/table/table.models';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private http: HttpService,
    private router: Router,
  ) { }

  public controller = "Authentication";
  private tokenKey = 'token';

  login(credentials: In_Login): Promise<boolean> {
    return this.http.post<any>(`${this.controller}/Login`, credentials)
      .then((response: any) => {
        const token = response.token;

        if (token) {
          const decodedToken = jwtDecode<JwtPayload>(token);
          const currentTime = Date.now() / 1000;

          if (decodedToken.exp && decodedToken.exp > currentTime) {
            localStorage.setItem(this.tokenKey, token);
            sessionStorage.setItem(this.tokenKey, token);
            return true;
          }
        }

        return false;
      });
  }

  createdAccount(credentials: In_CreateAccount): Promise<any> {
    return this.http.post<any>(`${this.controller}`, credentials);
  }


  isAuthenticated(): boolean {
    const token = localStorage.getItem(this.tokenKey);
    if (!token) return false;

    try {
      const decodedToken = jwtDecode<JwtPayload>(token);
      const currentTime = Date.now() / 1000;
      return decodedToken.exp ? decodedToken.exp > currentTime : false;
    } catch (error) {
      return false;
    }
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('token') !== null;
  }

  getUserById(id: number): Promise<any> {
    return this.http.get<any>(`${this.controller}/${id}`);
  }


  pagination(pagedList: PagedList<any>): Promise<any> {
    return this.http.post<any>(`${this.controller}/Pagination`, pagedList);
  }

  updateUser(id: number, userData: any): Promise<boolean> {
    return this.http.put<any>(`${this.controller}/${id}`, userData)
      .then(() => true);
  }

  deleteUser(id: number): Promise<boolean> {
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


