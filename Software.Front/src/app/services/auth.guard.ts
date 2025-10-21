import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthenticationService, private router: Router) {}

  canActivate(): boolean {
    return true;
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      // Redireciona para a página de login, caso não esteja autenticado
      this.router.navigate(['/login']);
      return false;
    }
  }
}
