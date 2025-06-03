import { In_CreateAccount } from '../../../models/In_createAccount';
import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../services/authentication.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';


interface RoleOption {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-new-account',
  imports: [SharedModule, CommonModule, ReactiveFormsModule],
  templateUrl: './new-account.component.html',
  styleUrl: './new-account.component.scss',
  standalone: true,
})
export class NewAccountComponent {
  registerForm!: FormGroup;
  hide = true;
  loading = false;
  roles: RoleOption[] = [
    { value: 2, viewValue: 'Médico' },
    { value: 3, viewValue: 'Paciente' }
  ];

  account = {};

  constructor(
    private fb: FormBuilder,
    private auth: AuthenticationService,
    private router: Router,
    private snack: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', [Validators.required, Validators.minLength(4)]],
      cpf: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]], 
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      role: [1, Validators.required]
    });
  }

  navigateTologin() {
    this.router.navigate(['login']);
  }

  onRegister(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    var account: In_CreateAccount = {
      name: this.registerForm.value.name,
      lastName: this.registerForm.value.lastName,
      cpf: this.registerForm.value.cpf,
      username: this.registerForm.value.username,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      role: this.registerForm.value.role
    }

    this.loading = true;
    this.auth.createdAccount(account).subscribe({
      next: () => {
        this.snack.open('Cadastro realizado com sucesso!', 'OK', { duration: 4000 });
        this.router.navigate(['/login']);
      },
      error: err => {
        this.snack.open(err.error?.message || 'Erro no cadastro', 'OK', { duration: 4000 });
      }
    }).add(() => this.loading = false);
  }

}
