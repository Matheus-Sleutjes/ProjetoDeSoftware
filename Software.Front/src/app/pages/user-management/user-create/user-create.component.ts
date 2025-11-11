import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from '../../../services/authentication.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-user-create',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.scss',
})
export class UserCreateComponent implements OnInit{

  userForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
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
    this.userForm.get('cpf')?.setValue(value);
  }

  onSubmit() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      this.toastService.show(
        'Por favor, preencha todos os campos obrigatórios corretamente.',
        '#dc3545', // vermelho
        '#ffffff',
        4000
      );
      return;
    }

    this.authService.createdAccount(this.userForm.value).subscribe({
      next: (response: any) => {
        console.log("criar conta", response);
        this.toastService.show(
          'Usuário criado com sucesso!',
          '#28a745', // verde
          '#ffffff',
          3000
        );
        this.userForm.reset();
        this.initializeForm();
      },
      error: (error: any) => {
        console.error("Erro ao criar conta", error);
        this.toastService.show(
          error.error?.message || 'Erro ao criar usuário. Tente novamente.',
          '#dc3545', // vermelho
          '#ffffff',
          4000
        );
      }
    });
  }

  initializeForm(): void {
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      cpf: ['', [Validators.required, Validators.pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)]],
      role: [3, [Validators.required]]
    });
  }
}
