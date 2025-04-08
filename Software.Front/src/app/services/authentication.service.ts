import { Injectable } from '@angular/core';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';
import { Login } from '../models/login';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    // private http: HttpService,
    private http: HttpService,
    private router: Router,
  ) { }

  public controller = "Usuario";
  private tokenKey = 'token';
  private readonly baseUrl = 'https://localhost:7265/api';

  //async login(credentials: Login): Promise<boolean>  {
    // var token = '';

    // const url = `${this.baseUrl}/${this.controller}/Login`
    // await this.http.post(url, credentials).subscribe(response => {
    //   console.log(response)
    // })

    // return true;
    // try {
    //   var token = '';
    //   this.http.post<any>(`${this.baseUrl}/${this.controller}/login`, credentials).subscribe((response: any) => {
    //     console.log(response)
    //     token = response.token;
    //   });


    //   if (token != "" && token != undefined) {
    //     const decodedToken = jwtDecode<JwtPayload>(token);
    //     const currentTime = Date.now() / 1000;

    //     if (decodedToken.exp && decodedToken.exp > currentTime) {
    //       localStorage.setItem(this.tokenKey, token);
    //       return true;
    //     } else {
    //       console.error('Token expirado');
    //       return false;
    //     }
    //   } else {
    //     console.error('Token não recebido');
    //     return false;
    //   }
    // } catch (error) {
    //   console.error('Erro no login', error);
    //   return false;
    // }
  //}

  login(credentials: Login): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      this.http.post(`${this.controller}/login`, credentials).subscribe(
        (response: any) => {
          console.log(response);
          const token = response.token;

          if (token) {
            const decodedToken = jwtDecode<JwtPayload>(token);
            const currentTime = Date.now() / 1000;

            if (decodedToken.exp && decodedToken.exp > currentTime) {
              localStorage.setItem(this.tokenKey, token);
              observer.next(true); // Emite verdadeiro
              observer.complete(); // Conclui o observable
            } else {
              console.error('Token expirado');
              observer.next(false); // Emite falso
              observer.complete();
            }
          } else {
            console.error('Token não recebido');
            observer.next(false); // Emite falso
            observer.complete();
          }
        },
        (error) => {
          console.error('Erro no login', error);
          observer.next(false); // Emite falso no erro
          observer.complete();
        }
      );
    });
  }


  isAuthenticated(): boolean {
    const token = localStorage.getItem(this.tokenKey);
    if (!token) return false;

    try {
      const decodedToken = jwtDecode<JwtPayload>(token);
      const currentTime = Date.now() / 1000;
      return decodedToken.exp ? decodedToken.exp > currentTime : false;
    } catch (error) {
      console.error('Erro ao decodificar token', error);
      return false;
    }
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    // Verifica se o usuário está autenticado
    return localStorage.getItem('token') !== null;
  }
}


