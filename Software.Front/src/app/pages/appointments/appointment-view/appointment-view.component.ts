import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CommonModule } from '@angular/common';
import { AppointmentService } from '../../../services/appointment.service';
import { PatientService } from '../../../services/patient.service';
import { DoctorService } from '../../../services/doctor.service';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-appointment-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './appointment-view.component.html',
  styleUrl: './appointment-view.component.scss',
})
export class AppointmentViewComponent implements OnInit {

  appointment: any = {};
  patient: any = {};
  doctor: any = {};
  appointmentId!: number;
  loading = false;

  constructor(
    private appointmentService: AppointmentService,
    private patientService: PatientService,
    private doctorService: DoctorService,
    private router: Router,
    private route: ActivatedRoute,
    private toastService: ToastService,
    private location: Location,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.appointmentId = +params['id'];
      if (this.appointmentId) {
        this.loadAppointment();
      } else {
        this.toastService.show(
          'ID do agendamento não fornecido.',
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

  getStatusDescription(status: number): string {
    switch (status) {
      case 1: return 'Agendado';
      case 2: return 'Confirmado';
      case 3: return 'Em Andamento';
      case 4: return 'Concluído';
      case 5: return 'Cancelado';
      case 6: return 'Não Compareceu';
      default: return 'Desconhecido';
    }
  }

  getStatusBadgeClass(status: number): string {
    switch (status) {
      case 1: return 'bg-primary';
      case 2: return 'bg-info';
      case 3: return 'bg-warning';
      case 4: return 'bg-success';
      case 5: return 'bg-danger';
      case 6: return 'bg-secondary';
      default: return 'bg-secondary';
    }
  }

  getPatientDisplay(): string {
    if (this.appointment.patientName) {
      return this.appointment.patientName;
    }
    if (this.patient && this.patient.name) {
      const cpf = this.patient.cpf ? `${this.patient.cpf} - ` : '';
      return `${cpf}${this.patient.name}`;
    }
    return 'Não informado';
  }

  getDoctorDisplay(): string {
    if (this.appointment.doctorName) {
      return this.appointment.doctorName;
    }
    if (this.doctor && this.doctor.name) {
      const crm = this.doctor.crm ? `${this.doctor.crm} - ` : '';
      return `${crm}${this.doctor.name}`;
    }
    return 'Não informado';
  }

  formatDateTime(dateTime: string): string {
    if (!dateTime) return 'Não informado';
    const date = new Date(dateTime);
    return date.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  loadAppointment(): void {
    this.loading = true;
    this.appointmentService.getAppointmentById(this.appointmentId).then(
      (appointment: any) => {
        this.appointment = appointment;
        if (appointment.patientId) {
          this.patientService.getPatientById(appointment.patientId).then(
            (patient: any) => {
              this.patient = patient;
            },
            () => {}
          );
        }
        if (appointment.doctorId) {
          this.doctorService.getDoctorById(appointment.doctorId).then(
            (doctor: any) => {
              this.doctor = doctor;
            },
            () => {}
          );
        }
        this.loading = false;
      },
      (error: any) => {
        this.toastService.show(
          error.error?.message || 'Erro ao carregar dados do agendamento.',
          '#dc3545',
          '#ffffff',
          4000
        );
        this.loading = false;
        this.goBack();
      }
    );
  }
}

