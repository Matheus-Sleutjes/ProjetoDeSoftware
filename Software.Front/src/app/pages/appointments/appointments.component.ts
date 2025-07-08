import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { UtilsService } from '../../services/utils.service';
import { AppointmentFormComponent } from './appointment-form/appointment-form.component';


interface Option {
  icon: string;
  label: string;
}

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss'],
  imports: [
    SharedModule,
    AppointmentFormComponent,
  ],
  standalone: true
})
export class AppointmentsComponent implements OnInit {
  selectedSpeciality: Option | null = null;
  userName: string = '';
  userRole: string = '';
  isDoctor: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private utils: UtilsService
  ) { }

  ngOnInit() {
    // Obter dados do usuário do JWT
    const userInfo = this.utils.decodeJwt();
    this.userName = userInfo?.name || '';
    this.userRole = userInfo?.acr?.toLowerCase() || '';
    this.isDoctor = this.userRole === 'doctor';

    // Obter especialidade selecionada da URL se houver
    this.route.queryParams.subscribe(params => {
      if (params['options']) {
        try {
          this.selectedSpeciality = JSON.parse(params['options']);
        } catch (e) {
          console.error('Erro ao processar opções:', e);
        }
      }
    });
  }

  navigateToCreateAppointment() {
    this.router.navigate(['/appointments/create'], {
      queryParams: { speciality: this.selectedSpeciality?.label }
    });
  }

  navigateToMyAppointments() {
    this.router.navigate(['/appointments/my-appointments']);
  }

  navigateToDoctorDashboard() {
    this.router.navigate(['/appointments/dashboard']);
  }

  navigateToNotificationSettings() {
    this.router.navigate(['/appointments/notification-settings']);
  }
}