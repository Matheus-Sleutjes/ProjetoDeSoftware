import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AppointmentService } from '../../../services/appointment.service';
import { PatientService } from '../../../services/patient.service';
import { DoctorService } from '../../../services/doctor.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-appointment-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './appointment-create.component.html',
  styleUrl: './appointment-create.component.scss',
})
export class AppointmentCreateComponent implements OnInit {

  appointmentForm!: FormGroup;
  loading = false;
  patients: any[] = [];
  doctors: any[] = [];
  filteredPatients: any[] = [];
  filteredDoctors: any[] = [];

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
    this.loadPatients();
    this.loadDoctors();
    this.setupAutocomplete();
  }

  goBack(): void {
    this.location.back();
  }

  loadPatients(term?: string): void {
    this.patientService.searchPatients(term).then(
      (patients: any[]) => {
        this.patients = patients || [];
        this.filteredPatients = this.patients;
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
        this.filteredDoctors = this.doctors;
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
    const appointmentData = {
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
          this.appointmentForm.reset();
          this.initializeForm();
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

  initializeForm(): void {
    this.appointmentForm = this.fb.group({
      patientId: ['', [Validators.required]],
      doctorId: ['', [Validators.required]],
      appointmentDate: ['', [Validators.required]],
      description: [''],
      status: [1, [Validators.required]],
      patientSearch: [''],
      doctorSearch: ['']
    });
  }

  private setupAutocomplete(): void {
    this.appointmentForm.get('patientSearch')?.valueChanges.subscribe(term => {
      const value = (term || '').trim();
      if (!value) {
        this.loadPatients();
      } else {
        this.loadPatients(value);
      }
      this.filteredPatients = this.filterPatients(value);
    });

    this.appointmentForm.get('doctorSearch')?.valueChanges.subscribe(term => {
      this.filteredDoctors = this.filterDoctors(term || '');
    });
  }

  private filterPatients(term: string): any[] {
    if (!term) {
      return this.patients;
    }
    const lower = term.toLowerCase();
    return this.patients.filter((p: any) =>
      (p.name || '').toLowerCase().includes(lower) ||
      (p.cpf || '').toLowerCase().includes(lower) ||
      (p.email || '').toLowerCase().includes(lower)
    );
  }

  private filterDoctors(term: string): any[] {
    if (!term) {
      return this.doctors;
    }
    const lower = term.toLowerCase();
    return this.doctors.filter((d: any) =>
      (d.name || '').toLowerCase().includes(lower) ||
      (d.crm || '').toLowerCase().includes(lower) ||
      (d.specialtyName || '').toLowerCase().includes(lower) ||
      (d.email || '').toLowerCase().includes(lower)
    );
  }

  selectPatient(patient: any): void {
    this.appointmentForm.patchValue({
      patientId: patient.patientId,
      patientSearch: patient.name || `Paciente ${patient.patientId}`
    });
  }

  selectDoctor(doctor: any): void {
    this.appointmentForm.patchValue({
      doctorId: doctor.doctorId,
      doctorSearch: doctor.name || `Médico ${doctor.doctorId}`
    });
  }
}

