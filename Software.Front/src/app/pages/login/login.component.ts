import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SharedModule } from '../../shared/shared.module';
import { AppModule } from '../../app.module';


@Component({
    selector: 'app-login',
    imports:[SharedModule],
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
        private snackBar: MatSnackBar
    ) { }

    ngOnInit(): void {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            senha: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    onLogin() {
        // if (this.loginForm.invalid) {
        //     this.loginForm.markAllAsTouched();
        //     return;
        // }

        console.log("ir pra outra tela")
        // this.loading = true;
        const { email, senha } = this.loginForm.value;

        this.router.navigate(['home']);
        // this.authService.login(email, senha).subscribe({
        //     next: () => this.router.navigate(['/dashboard']),
        //     error: (err: any) => {
        //         this.snackBar.open(err.error?.message || 'Erro no login', 'OK', { duration: 4000 });
        //     }
        // }).add(() => this.loading = false);
    }
}

