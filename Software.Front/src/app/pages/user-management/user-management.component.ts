import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { In_Users } from '../../models/In_users';
import { In_CreateAccount } from '../../models/In_createAccount';
import { ActionDefinition, ColumnDefinition, PagedList } from '../../shared/table/table.models';
import { TableComponent } from "../../shared/table/table.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, TableComponent]
})
export class UserManagementComponent implements OnInit {
  users: In_Users[] = [];
  filteredUsers: In_Users[] = [];
  loading = false;
  showForm = false;
  editingUser: In_Users | null = null;
  searchTerm = '';
  selectedRole = 0; // 0 = Todos, 1 = Admin, 2 = Doctor, 3 = Patient

  columns: ColumnDefinition[] = [
    { key: 'id', header: 'ID' },
    { key: 'nome', header: 'Nome' },
    { key: 'email', header: 'E-mail' },
  ];

  action: ActionDefinition[] = [
    { label: 'Editar', color: 'btn-primary', icon: 'fa-edit', route: './edit' },
    { label: 'Visualizar', color: 'btn-primary', icon: 'fa-eye', route: './view' },
  ];

  pagedList: PagedList<any> = {
    items: [
      // {id: '1', nome: 'matheus', email: 'matheussleutjes@gmail.com'},
      // {id: '1', nome: 'matheus', email: 'matheussleutjes@gmail.com'},
      // {id: '1', nome: 'matheus', email: 'matheussleutjes@gmail.com'},
      // {id: '1', nome: 'matheus', email: 'matheussleutjes@gmail.com'},
      // {id: '1', nome: 'matheus', email: 'matheussleutjes@gmail.com'},
      // {id: '1', nome: 'matheus', email: 'matheussleutjes@gmail.com'},
      // {id: '1', nome: 'matheus', email: 'matheussleutjes@gmail.com'},
      // {id: '1', nome: 'matheus', email: 'matheussleutjes@gmail.com'},
      // {id: '1', nome: 'matheus', email: 'matheussleutjes@gmail.com'},
      // {id: '1', nome: 'matheus', email: 'matheussleutjes@gmail.com'},
      // {id: '1', nome: 'matheus', email: 'matheussleutjes@gmail.com'}
    ],
    pageNumber: 1,
    pageSize: 10,
    totalPages: 1
  }
  
  // currentPage = 1;
  // pageSize = 10;

  userForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit(): void {
   this.onSearch();
  }

  onSearch(): void {
    this.authService.pagination(this.pagedList).subscribe((response: PagedList<any>) => {
      this.pagedList = response;
      
    });
  }

  goBack(): void {
    this.router.navigate(['/home']);
  }
  routerCreate(): void {
    this.router.navigate(['/users/create']);
  }

  // onPagedListChange(pagedList: PagedList<any>): void {
  //   // Aqui você pode enviar para o backend e atualizar
  //   this.pagedList = pagedList;
  //  // this.loadUsers();
  // }

  deleteUser(user: In_Users): void {
    if (confirm(`Tem certeza que deseja excluir o usuário ${user.name} ${user.lastName}?`)) {
      this.loading = true;
      this.authService.deleteUser(user.userId).subscribe({
        next: (success: boolean) => {
          if (success) {
            alert('Usuário excluído com sucesso!');
            //this.loadUsers();
          } else {
            alert('Erro ao excluir usuário.');
          }
        },
        error: (err) => {
          alert(err.error?.message || 'Erro ao excluir usuário');
        }
      }).add(() => this.loading = false);
    }
  }

  getRoleDescription(role: number): string {
    switch (role) {
      case 1: return 'Administrador';
      case 2: return 'Médico';
      case 3: return 'Paciente';
      default: return 'Desconhecido';
    }
  }

  getRoleBadgeClass(role: number): string {
    switch (role) {
      case 1: return 'badge bg-danger';
      case 2: return 'badge bg-primary';
      case 3: return 'badge bg-success';
      default: return 'badge bg-secondary';
    }
  }
}
