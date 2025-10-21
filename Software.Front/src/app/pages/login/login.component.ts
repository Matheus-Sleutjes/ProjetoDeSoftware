import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { Login } from '../../models/Login';


@Component({
    selector: 'app-login',
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    standalone: true,
})
export class LoginComponent implements OnInit {
    loginForm!: FormGroup;
    loading = false;
    hide = true;
    currentYear: number = new Date().getFullYear();

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private authService: AuthenticationService,
    ) { }

    ngOnInit(): void {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required,]]
        });
    }

    navigateToNewAccount() {
        console.log('Navigating to new account');
        this.router.navigate(['register']);
    }

    onLogin() {
        if (this.loginForm.invalid) {
            this.loginForm.markAllAsTouched();
            return;
        }

        this.loading = true;
        const credentials: Login = {
            email: this.loginForm.value.email,
            password: this.loginForm.value.password
        }

        this.authService.login(credentials).subscribe({
            next: (response: any) => {
                if (response) {
                    this.router.navigate(['home']);

                } else {
                    alert('Email ou senha incorretos');
                }
            },
            error: (err: any) => {
                alert(err.error?.message || 'Erro no login');
            }
        }).add(() => this.loading = false);

    }
}

