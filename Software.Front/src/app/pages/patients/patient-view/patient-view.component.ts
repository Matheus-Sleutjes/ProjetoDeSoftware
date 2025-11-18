import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CommonModule } from '@angular/common';
import { PatientService } from '../../../services/patient.service';
import { AuthenticationService } from '../../../services/authentication.service';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-patient-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './patient-view.component.html',
  styleUrl: './patient-view.component.scss',
})
export class PatientViewComponent implements OnInit {

  patient: any = {};
  user: any = {};
  patientId!: number;
  loading = false;

  constructor(
    private patientService: PatientService,
    private authService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
    private toastService: ToastService,
    private location: Location,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.patientId = +params['id'];
      if (this.patientId) {
        this.loadPatient();
      } else {
        this.toastService.show(
          'ID do paciente não fornecido.',
          '#dc3545',
          '#ffffff',
          4000
        );
        this.goBack();
      }
    });
  }

  goBack(): void {
    this.location.back();
  }

  loadPatient(): void {
    this.loading = true;
    this.patientService.getPatientById(this.patientId).then(
      (patient: any) => {
        this.patient = patient;
        this.authService.getUserById(patient.userId).then(
          (user: any) => {
            this.user = user;
            this.loading = false;
          },
          (error: any) => {
            this.toastService.show(
              error.error?.message || 'Erro ao carregar dados do usuário.',
              '#dc3545',
              '#ffffff',
              4000
            );
            this.loading = false;
            this.goBack();
          }
        );
      },
      (error: any) => {
        this.toastService.show(
          error.error?.message || 'Erro ao carregar dados do paciente.',
          '#dc3545',
          '#ffffff',
          4000
        );
        this.loading = false;
        this.goBack();
      }
    );
  }

  formatBirthDate(birthDate: any): string {
    if (!birthDate) {
      return '';
    }

    const date = new Date(birthDate);
    if (isNaN(date.getTime())) {
      return '';
    }

    return date.toLocaleDateString('pt-BR');
  }
}

