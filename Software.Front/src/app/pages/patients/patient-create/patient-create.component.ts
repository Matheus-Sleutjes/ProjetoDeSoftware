import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from '../../../services/authentication.service';
import { PatientService } from '../../../services/patient.service';
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
    private authService: AuthenticationService,
    private patientService: PatientService,
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
      password: this.patientForm.value.password,
      cpf: this.patientForm.value.cpf,
      phone: this.patientForm.value.phone || null,
      birthDate: this.patientForm.value.birthDate || null,
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

        const patientData = { userId: userId };

        this.patientService.createPatient(patientData)
          .then((success: boolean) => {
            if (success) {
              this.toastService.show(
                'Paciente criado com sucesso!',
                '#28a745',
                '#ffffff',
                3000
              );
              this.router.navigate(['/patients']);
            } else {
              this.toastService.show(
                'Usuário criado, mas ocorreu um erro ao criar o paciente.',
                '#dc3545',
                '#ffffff',
                4000
              );
            }
            this.loading = false;
          })
          .catch((error: any) => {
            this.toastService.show(
              error?.error?.message || 'Usuário criado, mas ocorreu um erro ao criar o paciente. Tente novamente.',
              '#dc3545',
              '#ffffff',
              4000
            );
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
      password: ['', [Validators.required, Validators.minLength(6)]],
      cpf: ['', [Validators.required, Validators.pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)]],
      phone: [''],
      birthDate: ['']
    });
  }
}

