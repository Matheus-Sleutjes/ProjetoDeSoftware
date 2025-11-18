import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-user-view',
  imports: [CommonModule],
  templateUrl: './user-view.component.html',
  styleUrl: './user-view.component.scss',
})
export class UserViewComponent implements OnInit {

  userId!: number;
  loading = false;
  user: any = {
    name: '',
    lastName: '',
    username: '',
    email: '',
    cpf: '',
    role: 3
  };

  constructor(
    private authService: AuthenticationService,
    private route: ActivatedRoute,
    private toastService: ToastService,
    private location: Location,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = +params['id'];
      if (this.userId) {
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

  getRoleDescription(role: number): string {
    switch (role) {
      case 1: return 'Administrador';
      case 2: return 'Médico';
      case 3: return 'Paciente';
      default: return 'Desconhecido';
    }
  }

  loadUser(): void {
    this.loading = true;
    this.authService.getUserById(this.userId).then(
      (user: any) => {
        this.user = {
          name: user.name || '',
          lastName: user.lastName || '',
          username: user.username || '',
          email: user.email || '',
          cpf: user.cpf || '',
          role: user.role || 3
        };
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
}
