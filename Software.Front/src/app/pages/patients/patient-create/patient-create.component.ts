import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { PatientService } from '../../../services/patient.service';
import { AuthenticationService } from '../../../services/authentication.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-patient-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './patient-create.component.html',
  styleUrl: './patient-create.component.scss',
})
export class PatientCreateComponent implements OnInit {

  patientForm!: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private patientService: PatientService,
    private authService: AuthenticationService,
    private router: Router,
    private toastService: ToastService,
    private location: Location,
  ) { }

  ngOnInit() {
    this.initializeForm();
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
    const userData = {
      name: this.patientForm.value.name,
      lastName: this.patientForm.value.lastName,
      username: this.patientForm.value.username,
      email: this.patientForm.value.email,
      password: '123456',
      cpf: this.patientForm.value.cpf,
      role: 3 as 1 | 2 | 3
    };

    this.authService.createdAccount(userData).then((response: any) => {
        const userId = response.userId;
        
        if (!userId) {
          this.toastService.show(
            'Usuário criado, mas não foi possível obter o ID. Tente novamente.',
            '#dc3545',
            '#ffffff',
            4000
          );
          this.loading = false;
          return;
        }

        const patientData: any = {
          userId: userId
        };

        this.patientService.createPatient(patientData)
          .then((success: boolean) => {
            if (success) {
              this.toastService.show(
                'Paciente criado com sucesso!',
                '#28a745',
                '#ffffff',
                3000
              );
              this.patientForm.reset();
              this.initializeForm();
            } else {
              this.toastService.show(
                'Erro ao criar paciente.',
                '#dc3545',
                '#ffffff',
                4000
              );
            }
          })
          .catch((error: any) => {
            this.toastService.show(
              error?.error?.message || 'Erro ao criar paciente. Tente novamente.',
              '#dc3545',
              '#ffffff',
              4000
            );
          })
          .finally(() => {
            this.loading = false;
          });
      })
      .catch((error: any) => {
        this.toastService.show(
          error?.error?.message || 'Erro ao criar usuário. Tente novamente.',
          '#dc3545',
          '#ffffff',
          4000
        );
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

