import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SharedModule } from '../../shared/shared.module';
import { AppModule } from '../../app.module';
import { AuthenticationService } from '../../services/authentication.service';
import { In_Login } from '../../models/In_login';


@Component({
    selector: 'app-login',
    imports: [SharedModule],
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
        private snackBar: MatSnackBar,
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
        this.router.navigate(['new-account']);
    }

    onLogin() {
        if (this.loginForm.invalid) {
            this.loginForm.markAllAsTouched();
            return;
        }

        this.loading = true;
        const credentials: In_Login = {
            email: this.loginForm.value.email,
            password: this.loginForm.value.password
        }

        this.authService.login(credentials).subscribe({
            next: (response: any) => {
                if (response) {
                    sessionStorage.setItem('token', response.token);
                    this.router.navigate(['home']);
                } else {
                    this.snackBar.open('emailn ou senha Incorreto', 'OK', { duration: 4000 });
                }
            },
            error: (err: any) => {
                this.snackBar.open(err.error?.message || 'Erro no login', 'OK', { duration: 4000 });
            }
        }).add(() => this.loading = false);

    }

    teste(){
        this.router.navigate(['/home'])
    }
}

