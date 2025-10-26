import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UtilsService } from '../../services/utils.service';
import { AuthenticationService } from '../../services/authentication.service';
import { MenuItens } from '../../menu-item';

interface Option {
  icon: string;
  label: string;
  route: string;
}

interface Clinic {
  name: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [CommonModule],
  standalone: true
})
export class HomeComponent {
  options: any[] = MenuItens;

  clinics: Clinic[] = [
    { name: 'Cuiabá  MT' },
    { name: 'São Paulo  SP' }
  ];

  name = '';
  acr = '';
  isAdmin = false;
  constructor(
    private router: Router,
    private util: UtilsService,
    private authService: AuthenticationService
  ) {
    // Agora você pode usar name e acr conforme necessário
  }

  logout() {
    this.authService.logout();
  }
  ngOnInit() {
    const decoded = this.util.decodeJwt();
    const name = decoded && decoded.name ? decoded.name : '';
    const acr = decoded && decoded.acr ? decoded.acr : '';
    this.name = name;
    this.acr = acr.toLowerCase();

    this.isAdmin = acr ? acr.toLowerCase() === 'admin' : false;
  }

  navigateToAppointments(pageOpt: Option) {
    this.router.navigate([`/${pageOpt.route}`]);
  }
}
