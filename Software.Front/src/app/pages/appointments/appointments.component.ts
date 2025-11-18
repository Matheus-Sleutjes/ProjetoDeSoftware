import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TableComponent } from '../../shared/table/table.component';
import { ConfirmModalComponent } from '../../shared/modal/confirm-modal.component';
import { ColumnDefinition, ActionDefinition, PagedList } from '../../shared/table/table.models';
import { AppointmentService } from '../../services/appointment.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, TableComponent, ConfirmModalComponent]
})
export class AppointmentsComponent implements OnInit {
  loading = false;
  searchTerm = '';

  columns: ColumnDefinition[] = [
    { key: 'appointmentId', header: 'ID' },
    { key: 'patientName', header: 'Paciente' },
    { key: 'doctorName', header: 'Médico' },
    { key: 'specialtyName', header: 'Especialidade' },
    { key: 'appointmentDate', header: 'Data/Hora' },
    { key: 'status', header: 'Status' }
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
    private appointmentService: AppointmentService,
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
    
    this.appointmentService.pagination(paginationRequest).then((response: any) => {
      this.pagedList = {
        items: (response.items || []).map((item: any) => ({
          ...item,
          appointmentDate: this.formatDateTime(item.appointmentDate),
          status: this.getStatusDescription(item.status)
        })),
        pageNumber: response.pageNumber,
        pageSize: response.pageSize,
        totalCount: response.totalCount,
        totalPages: response.totalPages,
        search: response.search || ''
      };
      this.loading = false;
    }).catch((error) => {
      this.toastService.show(
        'Erro ao carregar agendamentos',
        '#dc3545',
        '#ffffff',
        4000
      );
      this.loading = false;
    });
  }

  formatDateTime(dateTime: string): string {
    if (!dateTime) return '';
    const date = new Date(dateTime);
    return date.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  getStatusDescription(status: number): string {
    switch (status) {
      case 1: return 'Agendado';
      case 2: return 'Confirmado';
      case 3: return 'Em Andamento';
      case 4: return 'Concluído';
      case 5: return 'Cancelado';
      case 6: return 'Não Compareceu';
      default: return 'Desconhecido';
    }
  }

  goBack(): void {
    this.router.navigate(['/home']);
  }

  routerCreate(): void {
    this.router.navigate(['/appointments/create']);
  }

  openDeleteModal(item: any): void {
    this.itemToDelete = item;
    const itemName = item.patientName || `agendamento ${item.appointmentId || item.id || ''}`;
    this.deleteModalTitle = 'Confirmar Exclusão';
    this.deleteModalBody = `Tem certeza que deseja remover o agendamento de ${itemName}?`;
    this.showDeleteModal = true;
  }

  confirmDelete(): void {
    if (this.itemToDelete) {
      this.loading = true;
      this.appointmentService.deleteAppointment(this.itemToDelete.appointmentId).then(
        (success: boolean) => {
          if (success) {
            this.toastService.show(
              'Agendamento excluído com sucesso!',
              '#28a745',
              '#ffffff',
              3000
            );
            this.onSearch();
          } else {
            this.toastService.show(
              'Erro ao excluir agendamento.',
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
            err.error?.message || 'Erro ao excluir agendamento',
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
