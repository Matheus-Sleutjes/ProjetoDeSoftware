import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { SpecialtyService } from '../../../services/specialty.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-specialty-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './specialty-edit.component.html',
  styleUrl: './specialty-edit.component.scss',
})
export class SpecialtyEditComponent implements OnInit {

  specialtyForm!: FormGroup;
  specialtyId!: number;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private specialtyService: SpecialtyService,
    private router: Router,
    private route: ActivatedRoute,
    private toastService: ToastService,
    private location: Location,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.specialtyId = +params['id'];
      if (this.specialtyId) {
        this.initializeForm();
        this.loadSpecialty();
      } else {
        this.toastService.show(
          'ID da especialidade não fornecido.',
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

  loadSpecialty(): void {
    this.loading = true;
    this.specialtyService.getSpecialtyById(this.specialtyId).then(
      (specialty: any) => {
        this.specialtyForm.patchValue({
          description: specialty.description || ''
        });
        this.loading = false;
      },
      (error: any) => {
        this.toastService.show(
          error.error?.message || 'Erro ao carregar dados da especialidade.',
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
    const specialtyData: any = {
      description: this.specialtyForm.value.description
    };

    this.specialtyService.updateSpecialty(this.specialtyId, specialtyData)
      .then((success: boolean) => {
        if (success) {
          this.toastService.show(
            'Especialidade atualizada com sucesso!',
            '#28a745',
            '#ffffff',
            3000
          );
          this.goBack();
        } else {
          this.toastService.show(
            'Erro ao atualizar especialidade.',
            '#dc3545',
            '#ffffff',
            4000
          );
        }
      })
      .catch((error: any) => {
        this.toastService.show(
          error?.error?.message || 'Erro ao atualizar especialidade. Tente novamente.',
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

