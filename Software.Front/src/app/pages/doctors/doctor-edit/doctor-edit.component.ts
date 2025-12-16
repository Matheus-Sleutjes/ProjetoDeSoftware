import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { DoctorService } from '../../../services/doctor.service';
import { AuthenticationService } from '../../../services/authentication.service';
import { SpecialtyService } from '../../../services/specialty.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../../services/toast.service';
import { CpfValidator } from '../../../validators/cpf.validator';
import { CpfMaskDirective } from '../../../directives/cpf-mask.directive';

@Component({
  selector: 'app-doctor-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CpfMaskDirective],
  templateUrl: './doctor-edit.component.html',
  styleUrl: './doctor-edit.component.scss',
})
export class DoctorEditComponent implements OnInit {

  doctorForm!: FormGroup;
  doctorId!: number;
  userId!: number;
  loading = false;
  specialties: any[] = [];

  constructor(
    private fb: FormBuilder,
    private doctorService: DoctorService,
    private authService: AuthenticationService,
    private specialtyService: SpecialtyService,
    private router: Router,
    private route: ActivatedRoute,
    private toastService: ToastService,
    private location: Location,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.doctorId = +params['id'];
      if (this.doctorId) {
        this.initializeForm();
        this.loadSpecialties();
        this.loadDoctor();
      } else {
        this.toastService.show(
          'ID do médico não fornecido.',
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

  loadDoctor(): void {
    this.loading = true;
    this.doctorService.getDoctorById(this.doctorId).then(
      (doctor: any) => {
        this.userId = doctor.userId;
        
        const birthDateFormatted = doctor.birthDate 
          ? doctor.birthDate.split('T')[0]
          : '';
        
        this.doctorForm.patchValue({
          name: doctor.name?.split(' ')[0] || '',
          lastName: doctor.name?.split(' ').slice(1).join(' ') || '',
          username: doctor.username || '',
          email: doctor.email || '',
          cpf: doctor.cpf || '',
          crm: doctor.crm || '',
          specialtyId: doctor.specialtyId || '',
          phone: doctor.phone || '',
          birthDate: birthDateFormatted
        });
        this.loading = false;
      },
      (error: any) => {
        this.toastService.show(
          error.error?.message || 'Erro ao carregar dados do médico.',
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
    const userData = { ...this.doctorForm.value };
    delete userData.password;
    
    this.authService.updateUser(this.userId, userData)
      .then((success: boolean) => {
        if (success) {
          const doctorData = {
            userId: this.userId,
            crm: this.doctorForm.value.crm,
            specialtyId: this.doctorForm.value.specialtyId
          };
          
          this.doctorService.updateDoctor(this.doctorId, doctorData)
            .then((updateSuccess: boolean) => {
              if (updateSuccess) {
                this.toastService.show(
                  'Médico atualizado com sucesso!',
                  '#28a745',
                  '#ffffff',
                  3000
                );
                this.goBack();
              } else {
                this.toastService.show(
                  'Erro ao atualizar médico.',
                  '#dc3545',
                  '#ffffff',
                  4000
                );
              }
            });
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
          error?.error?.message || 'Erro ao atualizar usuário/médico. Tente novamente.',
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
    this.doctorForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      cpf: ['', [Validators.required, CpfValidator.validate()]],
      crm: ['', [Validators.required]],
      specialtyId: ['', [Validators.required]],
      phone: [''],
      birthDate: ['']
    });
  }
}

