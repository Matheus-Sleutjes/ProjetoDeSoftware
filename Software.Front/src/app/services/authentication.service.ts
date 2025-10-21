import { Injectable } from '@angular/core';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';
import { In_Login } from '../models/In_login';
import { In_CreateAccount } from '../models/In_createAccount';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    // private http: HttpService,
    private http: HttpService,
    private router: Router,
  ) { }

  public controller = "Authentication";
  private tokenKey = 'token';
  private readonly baseUrl = 'https://localhost:7055/';

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

  login(credentials: In_Login): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      this.http.post(`${this.controller}` + '/Login', credentials).subscribe(
        (response: any) => {
          console.log(response);
          const token = response.token;

          if (token) {
            const decodedToken = jwtDecode<JwtPayload>(token);
            const currentTime = Date.now() / 1000;

            if (decodedToken.exp && decodedToken.exp > currentTime) {
              localStorage.setItem(this.tokenKey, token);
              sessionStorage.setItem(this.tokenKey, token); 
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

  createdAccount(credentials: In_CreateAccount): Observable<any> {
    return new Observable<boolean>((observer) => {
      console.log("criar conta", credentials);
      this.http.post(`${this.controller}`, credentials).subscribe(
        (response: any) => {
          response = JSON.stringify(response)
          console.log(response);
          console.log("criar conta", response);
          observer.next(true); // Emite falso no erro
          observer.complete();


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

  getAllUsersByRole(roleId: number): Observable<any[]> {
    return this.http.get(`${this.controller}/GetAllByParameter?roleId=${roleId}`);
  }

  getUserById(id: number): Observable<any> {
    return this.http.get(`${this.controller}/${id}`);
  }

  getUserByCpf(cpf: string): Observable<any> {
    return this.http.get(`${this.controller}/GetByCpf?cpf=${cpf}`);
  }

  updateUser(id: number, userData: any): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      this.http.put(`${this.controller}/${id}`, userData).subscribe(
        (response: any) => {
          console.log('User updated:', response);
          observer.next(true);
          observer.complete();
        },
        (error) => {
          console.error('Erro ao atualizar usuário', error);
          observer.next(false);
          observer.complete();
        }
      );
    });
  }

  deleteUser(id: number): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      this.http.delete(`${this.controller}/${id}`).subscribe(
        (response: any) => {
          observer.next(true);
          observer.complete();
        },
        (error) => {
          console.error('Erro ao excluir usuário', error);
          observer.next(false);
          observer.complete();
        }
      );
    });
  }
}


