import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AppointmentService } from '../../../services/appointment.service';
import { PatientService } from '../../../services/patient.service';
import { DoctorService } from '../../../services/doctor.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../../services/toast.service';
import { AppointmentDto } from '../../../models/AppointmentDto';
import { AutocompleteComponent, AutocompleteOption } from '../../../components/autocomplete/autocomplete.component';

@Component({
  selector: 'app-appointment-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AutocompleteComponent],
  templateUrl: './appointment-create.component.html',
  styleUrl: './appointment-create.component.scss',
})
export class AppointmentCreateComponent implements OnInit {

  appointmentForm!: FormGroup;
  loading = false;
  patientOptions: AutocompleteOption[] = [];
  doctorOptions: AutocompleteOption[] = [];

  constructor(
    private fb: FormBuilder,
    private appointmentService: AppointmentService,
    private patientService: PatientService,
    private doctorService: DoctorService,
    private router: Router,
    private toastService: ToastService,
    private location: Location,
  ) { }

  ngOnInit() {
    this.initializeForm();
    this.loadPatients('');
    this.loadDoctors('');
  }

  goBack(): void {
    this.location.back();
  }

  loadPatients(term: string): void {
    const search = (term || '').trim() || undefined;
    this.patientService.searchPatients(search).then(
      (patients: any[]) => {
        this.patientOptions = (patients || []).map(patient => ({
          id: patient.patientId,
          displayLabel: `${patient.cpf || 'CPF não informado'} - ${patient.name || 'Paciente ' + patient.patientId}`,
          data: patient
        }));
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

  loadDoctors(term: string): void {
    const search = (term || '').trim() || undefined;
    this.doctorService.searchDoctors(search).then(
      (doctors: any[]) => {
        this.doctorOptions = (doctors || []).map(doctor => ({
          id: doctor.doctorId,
          displayLabel: `${doctor.crm || 'CRM não informado'} - ${doctor.name || 'Médico ' + doctor.doctorId}`,
          data: doctor
        }));
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
    const appointmentData: AppointmentDto = {
      patientId: this.appointmentForm.value.patientId,
      doctorId: this.appointmentForm.value.doctorId,
      appointmentDate: this.appointmentForm.value.appointmentDate,
      description: this.appointmentForm.value.description || '',
      status: 1
    };

    this.appointmentService.createAppointment(appointmentData)
      .then((success: boolean) => {
        if (success) {
          this.toastService.show(
            'Agendamento criado com sucesso!',
            '#28a745',
            '#ffffff',
            3000
          );
          this.router.navigate(['/appointments']);
        } else {
          this.toastService.show(
            'Erro ao criar agendamento.',
            '#dc3545',
            '#ffffff',
            4000
          );
        }
      })
      .catch((error: any) => {
        this.toastService.show(
          error?.error?.message || 'Erro ao criar agendamento. Tente novamente.',
          '#dc3545',
          '#ffffff',
          4000
        );
      })
      .finally(() => {
        this.loading = false;
      });
  }

  onPatientSearch(term: string): void {
    this.loadPatients(term);
  }

  onDoctorSearch(term: string): void {
    this.loadDoctors(term);
  }

  initializeForm(): void {
    this.appointmentForm = this.fb.group({
      patientId: ['', [Validators.required]],
      doctorId: ['', [Validators.required]],
      appointmentDate: ['', [Validators.required]],
      description: ['']
    });
  }
}


