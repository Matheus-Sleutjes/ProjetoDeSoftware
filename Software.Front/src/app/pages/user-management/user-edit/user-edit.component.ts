import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from '../../../services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../../services/toast.service';
import { CpfValidator } from '../../../validators/cpf.validator';
import { CpfMaskDirective } from '../../../directives/cpf-mask.directive';

@Component({
  selector: 'app-user-edit',
  imports: [CommonModule, ReactiveFormsModule, CpfMaskDirective],
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.scss',
})
export class UserEditComponent implements OnInit {

  userForm!: FormGroup;
  userId!: number;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
    private toastService: ToastService,
    private location: Location,
  ) { }

  ngOnInit() {
    if (!this.authService.isAdmin()) {
      this.toastService.show(
        'Você não tem permissão de administrador para editar usuários.',
        '#dc3545',
        '#ffffff',
        4000
      );
      this.router.navigate(['/home']);
      return;
    }

    this.route.params.subscribe(params => {
      this.userId = +params['id'];
      if (this.userId) {
        this.initializeForm();
        this.loadUser();
      } else {
        this.toastService.show(
          'ID do usuário não fornecido.',
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

  loadUser(): void {
    this.loading = true;
    this.authService.getUserById(this.userId).then(
      (user: any) => {
        const birthDateFormatted = user.birthDate ? user.birthDate.split('T')[0] : '';
        
        this.userForm.patchValue({
          name: user.name || '',
          lastName: user.lastName || '',
          username: user.username || '',
          email: user.email || '',
          cpf: user.cpf || '',
          phone: user.phone || '',
          birthDate: birthDateFormatted,
          role: user.role || 3
        });
        this.loading = false;
      },
      (error: any) => {
        this.toastService.show(
          error.error?.message || 'Erro ao carregar dados do usuário.',
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
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      this.toastService.show(
        'Por favor, preencha todos os campos obrigatórios corretamente.',
        '#dc3545',
        '#ffffff',
        4000
      );
      return;
    }

    this.loading = true;
    const userData = { ...this.userForm.value };
    
    if (!userData.password || userData.password.trim() === '') {
      delete userData.password;
    }
    
    this.authService.updateUser(this.userId, userData)
      .then((success: boolean) => {
        if (success) {
          this.toastService.show(
            'Usuário atualizado com sucesso!',
            '#28a745',
            '#ffffff',
            3000
          );
          this.goBack();
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
          error?.error?.message || 'Erro ao atualizar usuário. Tente novamente.',
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
    this.userForm = this.fb.group({
      userId: [0, []],
      name: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      cpf: ['', [Validators.required, CpfValidator.validate()]],
      phone: [''],
      birthDate: [''],
      role: [3, [Validators.required]],
      password: ['']
    });
  }
}
