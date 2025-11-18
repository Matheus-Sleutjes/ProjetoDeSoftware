import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { ToastService } from '../../services/toast.service';
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
        private toastService: ToastService,
    ) { }

    ngOnInit(): void {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required,]]
        });
    }

    navigateToNewAccount() {
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

        this.authService.login(credentials)
            .then((success: boolean) => {
                if (success) {
                    this.router.navigate(['home']);
                } else {
                    this.toastService.show(
                        'Email ou senha incorretos',
                        '#dc3545',
                        '#ffffff',
                        4000
                    );
                }
            })
            .catch((err: any) => {
                this.toastService.show(
                    err?.error?.message || 'Erro no login',
                    '#dc3545',
                    '#ffffff',
                    4000
                );
            })
            .finally(() => {
                this.loading = false;
            });

    }
}

