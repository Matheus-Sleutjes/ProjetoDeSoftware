import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { In_Users } from '../../models/In_users';
import { ActionDefinition, ColumnDefinition, PagedList } from '../../shared/table/table.models';
import { TableComponent } from "../../shared/table/table.component";
import { ConfirmModalComponent } from '../../shared/modal/confirm-modal.component';
import { ToastService } from '../../services/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, TableComponent, ConfirmModalComponent]
})
export class UserManagementComponent implements OnInit {
  users: In_Users[] = [];
  filteredUsers: In_Users[] = [];
  loading = false;
  showForm = false;
  editingUser: In_Users | null = null;
  searchTerm = '';
  selectedRole = 0;

  columns: ColumnDefinition[] = [
    { key: 'userId', header: 'ID' },
    { key: 'name', header: 'Nome' },
    { key: 'email', header: 'E-mail' },
  ];

  action: ActionDefinition[] = [];

  showDeleteModal = false;
  itemToDelete: any = null;
  deleteModalTitle = 'Confirmar Exclusão';
  deleteModalBody = '';

  pagedList: PagedList<any> = {
    items: [],
    pageNumber: 1,
    pageSize: 10,
    totalPages: 1,
    search: ''
  }

  userForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private toastService: ToastService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.action = [
      { label: 'Editar', color: 'btn-primary', icon: 'fa-edit', route: './edit/:id' },
      { label: 'Visualizar', color: 'btn-primary', icon: 'fa-eye', route: './view/:id' },
      { label: 'Remover', color: 'btn-danger', icon: 'fa-trash', action: (item: any) => this.openDeleteModal(item) }
    ];
    this.onSearch();
  }

  onSearch(): void {
    this.loading = true;
    const paginationRequest = {
      ...this.pagedList,
      search: this.pagedList.search || this.searchTerm || ''
    };
    
    this.authService.pagination(paginationRequest).then((response: any) => {
      this.pagedList = {
        items: response.items || [],
        pageNumber: response.pageNumber,
        pageSize: response.pageSize,
        totalCount: response.totalCount,
        totalPages: response.totalPages,
        search: response.search || ''
      };
      this.loading = false;
    }).catch((error) => {
      this.toastService.show(
        'Erro ao carregar usuários',
        '#dc3545',
        '#ffffff',
        4000
      );
      this.loading = false;
    });
  }

  goBack(): void {
    this.router.navigate(['/home']);
  }
  routerCreate(): void {
    this.router.navigate(['/users/create']);
  }


  openDeleteModal(item: any): void {
    this.itemToDelete = item;
    const itemName = item.name ? `${item.name} ${item.lastName || ''}`.trim() : `item ${item.userId || item.id || ''}`;
    this.deleteModalTitle = 'Confirmar Exclusão';
    this.deleteModalBody = `Tem certeza que deseja remover ${itemName}?`;
    this.showDeleteModal = true;
  }

  confirmDelete(): void {
    if (this.itemToDelete) {
      this.loading = true;
      this.authService.deleteUser(this.itemToDelete.userId).then(
        (success: boolean) => {
          if (success) {
            this.toastService.show(
              'Usuário excluído com sucesso!',
              '#28a745',
              '#ffffff',
              3000
            );
            this.onSearch();
          } else {
            this.toastService.show(
              'Erro ao excluir usuário.',
              '#dc3545',
              '#ffffff',
              4000
            );
          }
          this.loading = false;
          this.closeDeleteModal();
        },
        (err) => {
          this.toastService.show(
            err.error?.message || 'Erro ao excluir usuário',
            '#dc3545',
            '#ffffff',
            4000
          );
          this.loading = false;
          this.closeDeleteModal();
        }
      );
    }
  }

  closeDeleteModal(): void {
    this.showDeleteModal = false;
    this.itemToDelete = null;
    this.deleteModalTitle = 'Confirmar Exclusão';
    this.deleteModalBody = '';
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
