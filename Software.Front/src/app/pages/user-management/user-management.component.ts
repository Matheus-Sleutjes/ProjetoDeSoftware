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
      {id: '1', nome: 'matheus', email: 'matheussleutjes@gmail.com'},
      {id: '1', nome: 'matheus', email: 'matheussleutjes@gmail.com'},
      {id: '1', nome: 'matheus', email: 'matheussleutjes@gmail.com'},
      {id: '1', nome: 'matheus', email: 'matheussleutjes@gmail.com'},
      {id: '1', nome: 'matheus', email: 'matheussleutjes@gmail.com'},
      {id: '1', nome: 'matheus', email: 'matheussleutjes@gmail.com'},
      {id: '1', nome: 'matheus', email: 'matheussleutjes@gmail.com'},
      {id: '1', nome: 'matheus', email: 'matheussleutjes@gmail.com'},
      {id: '1', nome: 'matheus', email: 'matheussleutjes@gmail.com'},
      {id: '1', nome: 'matheus', email: 'matheussleutjes@gmail.com'},
      {id: '1', nome: 'matheus', email: 'matheussleutjes@gmail.com'}
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
    this.initializeForm();
    this.loadUsers();
  }

  goBack(): void {
    this.router.navigate(['/home']);
  }

  onPagedListChange(pagedList: PagedList<any>): void {
    // Aqui você pode enviar para o backend e atualizar
    this.pagedList = pagedList;
    this.loadUsers();
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

  loadUsers(): void {
    this.loading = true;
    // Carregar todos os usuários por role (1, 2, 3)
    const roles = [1, 2, 3];
    let loadedUsers: In_Users[] = [];
    let completedRequests = 0;

    roles.forEach(role => {
      this.authService.getAllUsersByRole(role).subscribe({
        next: (users: In_Users[]) => {
          loadedUsers = [...loadedUsers, ...users];
          completedRequests++;
          
          if (completedRequests === roles.length) {
            this.users = loadedUsers;
            this.filteredUsers = [...this.users];
            this.loading = false;
          }
        },
        error: (err) => {
          console.error('Erro ao carregar usuários:', err);
          completedRequests++;
          
          if (completedRequests === roles.length) {
            this.users = loadedUsers;
            this.filteredUsers = [...this.users];
            this.loading = false;
          }
        }
      });
    });
  }

  searchUsers(): void {
    this.filteredUsers = this.users.filter(user => {
      const matchesSearch = !this.searchTerm || 
        user.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        user.lastName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        user.cpf.includes(this.searchTerm);
      
      const matchesRole = this.selectedRole === 0 || user.role === this.selectedRole;
      
      return matchesSearch && matchesRole;
    });
  }

  onSearchChange(): void {
    this.searchUsers();
  }

  onRoleChange(): void {
    this.searchUsers();
  }

  showCreateForm(): void {
    this.editingUser = null;
    this.userForm.reset();
    this.userForm.patchValue({ role: 3 });
    this.showForm = true;
  }

  showEditForm(user: In_Users): void {
    this.editingUser = user;
    this.userForm.patchValue({
      name: user.name,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
      cpf: user.cpf,
      role: user.role
    });
    // Remover validação de senha para edição
    this.userForm.get('password')?.clearValidators();
    this.userForm.get('password')?.updateValueAndValidity();
    this.showForm = true;
  }

  hideForm(): void {
    this.showForm = false;
    this.editingUser = null;
    this.userForm.reset();
    // Restaurar validação de senha
    this.userForm.get('password')?.setValidators([Validators.required, Validators.minLength(6)]);
    this.userForm.get('password')?.updateValueAndValidity();
  }

  formatCpf(event: any): void {
    let value = event.target.value.replace(/\D/g, '');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    event.target.value = value;
    this.userForm.get('cpf')?.setValue(value);
  }

  onSubmit(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    const formValue = this.userForm.value;

    if (this.editingUser) {
      // Atualizar usuário existente
      const updateData = {
        name: formValue.name,
        lastName: formValue.lastName,
        username: formValue.username,
        email: formValue.email,
        cpf: formValue.cpf,
        role: formValue.role,
        password: formValue.password || undefined // Só incluir senha se foi preenchida
      };

      this.authService.updateUser(this.editingUser.userId, updateData).subscribe({
        next: (success: boolean) => {
          if (success) {
            alert('Usuário atualizado com sucesso!');
            this.loadUsers();
            this.hideForm();
          } else {
            alert('Erro ao atualizar usuário.');
          }
        },
        error: (err) => {
          alert(err.error?.message || 'Erro ao atualizar usuário');
        }
      }).add(() => this.loading = false);
    } else {
      // Criar novo usuário
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
            alert('Usuário criado com sucesso!');
            this.loadUsers();
            this.hideForm();
          } else {
            alert('Erro ao criar usuário.');
          }
        },
        error: (err) => {
          alert(err.error?.message || 'Erro ao criar usuário');
        }
      }).add(() => this.loading = false);
    }
  }

  deleteUser(user: In_Users): void {
    if (confirm(`Tem certeza que deseja excluir o usuário ${user.name} ${user.lastName}?`)) {
      this.loading = true;
      this.authService.deleteUser(user.userId).subscribe({
        next: (success: boolean) => {
          if (success) {
            alert('Usuário excluído com sucesso!');
            this.loadUsers();
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
