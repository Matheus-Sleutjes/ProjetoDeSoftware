import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { DoctorService } from '../../../services/doctor.service';
import { AuthenticationService } from '../../../services/authentication.service';
import { SpecialtyService } from '../../../services/specialty.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-doctor-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './doctor-create.component.html',
  styleUrl: './doctor-create.component.scss',
})
export class DoctorCreateComponent implements OnInit {

  doctorForm!: FormGroup;
  loading = false;
  specialties: any[] = [];

  constructor(
    private fb: FormBuilder,
    private doctorService: DoctorService,
    private authService: AuthenticationService,
    private specialtyService: SpecialtyService,
    private router: Router,
    private toastService: ToastService,
    private location: Location,
  ) { }

  ngOnInit() {
    this.initializeForm();
    this.loadSpecialties();
  }

  goBack(): void {
    this.location.back();
  }

  loadSpecialties(): void {
    this.specialtyService.getAllSpecialties().then(
      (specialties: any[]) => {
        this.specialties = specialties || [];
      },
      (error: any) => {
        this.toastService.show(
          'Erro ao carregar especialidades',
          '#dc3545',
          '#ffffff',
          4000
        );
      }
    );
  }

  formatCpf(event: any): void {
    let value = event.target.value.replace(/\D/g, '');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    event.target.value = value;
    this.doctorForm.get('cpf')?.setValue(value);
  }

  onSubmit() {
    if (this.doctorForm.invalid) {
      this.doctorForm.markAllAsTouched();
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
      name: this.doctorForm.value.name,
      lastName: this.doctorForm.value.lastName,
      username: this.doctorForm.value.username,
      email: this.doctorForm.value.email,
      password: this.doctorForm.value.password,
      cpf: this.doctorForm.value.cpf,
      role: 2 as 1 | 2 | 3
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

        const doctorData = {
          userId: userId,
          crm: this.doctorForm.value.crm,
          specialtyId: this.doctorForm.value.specialtyId
        };

        this.doctorService.createDoctor(doctorData)
          .then((success: boolean) => {
            if (success) {
              this.toastService.show(
                'Médico criado com sucesso!',
                '#28a745',
                '#ffffff',
                3000
              );
              this.router.navigate(['/doctors']);
            } else {
              this.toastService.show(
                'Erro ao criar médico.',
                '#dc3545',
                '#ffffff',
                4000
              );
            }
          })
          .catch((error: any) => {
            this.toastService.show(
              error?.error?.message || 'Erro ao criar médico. Tente novamente.',
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
    this.doctorForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      cpf: ['', [Validators.required, Validators.pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)]],
      crm: ['', [Validators.required]],
      specialtyId: ['', [Validators.required]],
      phone: ['']
    });
  }
}

