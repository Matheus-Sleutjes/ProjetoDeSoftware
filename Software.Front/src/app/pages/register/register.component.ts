import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { In_CreateAccount } from '../../models/In_createAccount';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  loading = false;
  hidePassword = true;
  hideConfirmPassword = true;
  currentYear: number = new Date().getFullYear();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthenticationService,
  ) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      cpf: ['', [Validators.required, Validators.pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)]],
      role: [3] // Default: Patient (fixed)
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
    return null;
  }

  formatCpf(event: any) {
    let value = event.target.value.replace(/\D/g, '');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    event.target.value = value;
    this.registerForm.get('cpf')?.setValue(value);
  }

  onRegister() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    const formValue = this.registerForm.value;
    
    const newUser: In_CreateAccount = {
      name: formValue.name,
      lastName: formValue.lastName,
      username: formValue.username,
      email: formValue.email,
      password: formValue.password,
      cpf: formValue.cpf,
      role: formValue.role
    };

    this.authService.createdAccount(newUser).subscribe({
      next: (success: boolean) => {
        if (success) {
          alert('Conta criada com sucesso! Faça login para continuar.');
          this.router.navigate(['/login']);
        } else {
          alert('Erro ao criar conta. Tente novamente.');
        }
      },
      error: (err: any) => {
        alert(err.error?.message || 'Erro ao criar conta');
      }
    }).add(() => this.loading = false);
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

}
