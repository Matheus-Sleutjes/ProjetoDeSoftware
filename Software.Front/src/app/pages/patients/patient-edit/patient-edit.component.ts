import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from '../../../services/authentication.service';
import { PatientService } from '../../../services/patient.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-patient-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './patient-edit.component.html',
  styleUrl: './patient-edit.component.scss',
})
export class PatientEditComponent implements OnInit {

  patientForm!: FormGroup;
  patientId!: number;
  userId!: number;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private patientService: PatientService,
    private router: Router,
    private route: ActivatedRoute,
    private toastService: ToastService,
    private location: Location,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.patientId = +params['id'];
      if (this.patientId) {
        this.initializeForm();
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

  formatCpf(event: any): void {
    let value = event.target.value.replace(/\D/g, '');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    event.target.value = value;
    this.patientForm.get('cpf')?.setValue(value);
  }

  loadPatient(): void {
    this.loading = true;
    this.patientService.getPatientById(this.patientId).then(
      (patient: any) => {
        this.userId = patient.userId;
        
        const birthDateFormatted = patient.birthDate 
          ? new Date(patient.birthDate).toISOString().slice(0, 10)
          : '';
        
        this.patientForm.patchValue({
          name: patient.name?.split(' ')[0] || '',
          lastName: patient.name?.split(' ').slice(1).join(' ') || '',
          username: patient.username || '',
          email: patient.email || '',
          cpf: patient.cpf || '',
          phone: patient.phone || '',
          birthDate: birthDateFormatted
        });
        this.loading = false;
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

  onSubmit() {
    if (this.patientForm.invalid) {
      this.patientForm.markAllAsTouched();
      this.toastService.show(
        'Por favor, preencha todos os campos obrigatórios corretamente.',
        '#dc3545',
        '#ffffff',
        4000
      );
      return;
    }

    this.loading = true;
    const userData = { ...this.patientForm.value };
    delete userData.password;

    this.authService.updateUser(this.userId, userData)
      .then((success: boolean) => {
        if (success) {
          this.toastService.show(
            'Paciente atualizado com sucesso!',
            '#28a745',
            '#ffffff',
            3000
          );
          this.goBack();
        } else {
          this.toastService.show(
            'Erro ao atualizar usuário.',
            '#dc3545',
            '#ffffff',
            4000
          );
        }
      })
      .catch((error: any) => {
        this.toastService.show(
          error?.error?.message || 'Erro ao atualizar usuário/paciente. Tente novamente.',
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
    this.patientForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      cpf: ['', [Validators.required, Validators.pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)]],
      phone: [''],
      birthDate: ['']
    });
  }
}

