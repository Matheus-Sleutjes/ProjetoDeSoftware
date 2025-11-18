import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { SpecialtyService } from '../../../services/specialty.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-specialty-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './specialty-create.component.html',
  styleUrl: './specialty-create.component.scss',
})
export class SpecialtyCreateComponent implements OnInit {

  specialtyForm!: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private specialtyService: SpecialtyService,
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

  onSubmit() {
    if (this.specialtyForm.invalid) {
      this.specialtyForm.markAllAsTouched();
      this.toastService.show(
        'Por favor, preencha todos os campos obrigatórios corretamente.',
        '#dc3545',
        '#ffffff',
        4000
      );
      return;
    }

    this.loading = true;
    const specialtyData = {
      specialtyId: 0,
      description: this.specialtyForm.value.description
    };

    this.specialtyService.createSpecialty(specialtyData)
      .then((success: boolean) => {
        if (success) {
          this.toastService.show(
            'Especialidade criada com sucesso!',
            '#28a745',
            '#ffffff',
            3000
          );
          this.specialtyForm.reset();
          this.initializeForm();
        } else {
          this.toastService.show(
            'Erro ao criar especialidade.',
            '#dc3545',
            '#ffffff',
            4000
          );
        }
      })
      .catch((error: any) => {
        this.toastService.show(
          error?.error?.message || 'Erro ao criar especialidade. Tente novamente.',
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
    this.specialtyForm = this.fb.group({
      description: ['', [Validators.required, Validators.minLength(3)]]
    });
  }
}

