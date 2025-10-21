import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UtilsService } from '../../services/utils.service';
import { AuthenticationService } from '../../services/authentication.service';

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
  options: Option[] = [
    { icon: 'fa-user-md', label: 'Médicos', route: 'doctors' },
    { icon: 'fa-user', label: 'Pacientes', route: 'patients' },
    { icon: 'fa-calendar-alt', label: 'Agendamentos', route: 'appointments' },
    { icon: 'fa-stethoscope', label: 'Especialidades', route: 'specialties' },
  ];

  clinics: Clinic[] = [
    { name: 'Cuiabá – MT' },
    { name: 'São Paulo – SP' }
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
    console.log('Navegando para:', pageOpt.route);
    this.router.navigate([`/${pageOpt.route}`]);
  }

  navigateToRegisterUser() {
    this.router.navigate(['/register']);
  }

  navigateToListUser() {
    this.router.navigate(['/users']);
  }

  navigateToHistory() {
    // Por enquanto, mostrar alerta - implementar quando a página estiver pronta
    alert('Funcionalidade de Histórico será implementada em breve!');
  }

  navigateToAppointmentsList() {
    this.router.navigate(['/appointments']);
  }

  navigateToDoctors() {
    this.router.navigate(['/doctors']);
  }

  navigateToPatients() {
    this.router.navigate(['/patients']);
  }

  navigateToSpecialties() {
    this.router.navigate(['/specialties']);
  }
}
