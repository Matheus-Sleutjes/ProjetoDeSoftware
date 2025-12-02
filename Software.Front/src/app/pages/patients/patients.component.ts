import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TableComponent } from '../../shared/table/table.component';
import { ConfirmationModalComponent } from '../../shared/modal/confirmation-modal.component';
import { ColumnDefinition, ActionDefinition, PagedList } from '../../shared/table/table.models';
import { PatientService } from '../../services/patient.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, TableComponent, ConfirmationModalComponent]
})
export class PatientsComponent implements OnInit {
  loading = false;
  searchTerm = '';

  columns: ColumnDefinition[] = [
    { key: 'patientId', header: 'ID' },
    { key: 'name', header: 'Nome' },
    { key: 'email', header: 'E-mail' },
    { key: 'cpf', header: 'CPF' }
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
  };

  constructor(
    private router: Router,
    private patientService: PatientService,
    private toastService: ToastService
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
    
    this.patientService.pagination(paginationRequest).then((response: any) => {
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
        'Erro ao carregar pacientes',
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
    this.router.navigate(['/patients/create']);
  }

  openDeleteModal(item: any): void {
    this.itemToDelete = item;
    const itemName = item.name || `item ${item.patientId || item.id || ''}`;
    this.deleteModalTitle = 'Confirmar Exclusão';
    this.deleteModalBody = `Tem certeza que deseja remover ${itemName}?`;
    this.showDeleteModal = true;
  }

  confirmDelete(): void {
    if (this.itemToDelete) {
      this.loading = true;
      this.patientService.deletePatient(this.itemToDelete.patientId).then(
        (success: boolean) => {
          if (success) {
            this.toastService.show(
              'Paciente excluído com sucesso!',
              '#28a745',
              '#ffffff',
              3000
            );
            this.onSearch();
          } else {
            this.toastService.show(
              'Erro ao excluir paciente.',
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
            err.error?.message || 'Erro ao excluir paciente',
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
}
