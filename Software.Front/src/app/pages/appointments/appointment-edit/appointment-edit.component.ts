import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AppointmentService } from '../../../services/appointment.service';
import { PatientService } from '../../../services/patient.service';
import { DoctorService } from '../../../services/doctor.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-appointment-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './appointment-edit.component.html',
  styleUrl: './appointment-edit.component.scss',
})
export class AppointmentEditComponent implements OnInit {

  appointmentForm!: FormGroup;
  appointmentId!: number;
  loading = false;
  patients: any[] = [];
  doctors: any[] = [];

  constructor(
    private fb: FormBuilder,
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
        this.initializeForm();
        this.loadPatients();
        this.loadDoctors();
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

  loadPatients(): void {
    this.patientService.getAllPatients().then(
      (patients: any[]) => {
        this.patients = patients || [];
      },
      (error: any) => {
        this.toastService.show(
          'Erro ao carregar pacientes',
          '#dc3545',
          '#ffffff',
          4000
        );
      }
    );
  }

  loadDoctors(): void {
    this.doctorService.getAllDoctors().then(
      (doctors: any[]) => {
        this.doctors = doctors || [];
      },
      (error: any) => {
        this.toastService.show(
          'Erro ao carregar médicos',
          '#dc3545',
          '#ffffff',
          4000
        );
      }
    );
  }

  loadAppointment(): void {
    this.loading = true;
    this.appointmentService.getAppointmentById(this.appointmentId).then(
      (appointment: any) => {
        const appointmentDate = appointment.appointmentDate ? new Date(appointment.appointmentDate).toISOString().slice(0, 16) : '';
        this.appointmentForm.patchValue({
          patientId: appointment.patientId || '',
          doctorId: appointment.doctorId || '',
          appointmentDate: appointmentDate,
          description: appointment.description || '',
          status: appointment.status || 1
        });
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

  onSubmit() {
    if (this.appointmentForm.invalid) {
      this.appointmentForm.markAllAsTouched();
      this.toastService.show(
        'Por favor, preencha todos os campos obrigatórios corretamente.',
        '#dc3545',
        '#ffffff',
        4000
      );
      return;
    }

    this.loading = true;
    const appointmentData = {
      patientId: this.appointmentForm.value.patientId,
      doctorId: this.appointmentForm.value.doctorId,
      appointmentDate: this.appointmentForm.value.appointmentDate,
      description: this.appointmentForm.value.description || '',
      status: this.appointmentForm.value.status
    };

    this.appointmentService.updateAppointment(this.appointmentId, appointmentData)
      .then((success: boolean) => {
        if (success) {
          this.toastService.show(
            'Agendamento atualizado com sucesso!',
            '#28a745',
            '#ffffff',
            3000
          );
          this.goBack();
        } else {
          this.toastService.show(
            'Erro ao atualizar agendamento.',
            '#dc3545',
            '#ffffff',
            4000
          );
        }
      })
      .catch((error: any) => {
        this.toastService.show(
          error?.error?.message || 'Erro ao atualizar agendamento. Tente novamente.',
          '#dc3545',
          '#ffffff',
          4000
        );
      })
      .finally(() => {
        this.loading = false;
      });
  }

  initializeForm(): void {
    this.appointmentForm = this.fb.group({
      patientId: ['', [Validators.required]],
      doctorId: ['', [Validators.required]],
      appointmentDate: ['', [Validators.required]],
      description: [''],
      status: [1, [Validators.required]]
    });
  }
}

