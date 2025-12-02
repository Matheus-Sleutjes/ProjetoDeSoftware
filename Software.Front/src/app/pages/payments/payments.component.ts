import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TableComponent } from '../../shared/table/table.component';
import { ColumnDefinition, ActionDefinition, PagedList } from '../../shared/table/table.models';
import { ToastService } from '../../services/toast.service';
import { PaymentService } from '../../services/payment.service';
import { ConfirmationModalComponent } from '../../shared/modal/confirmation-modal.component';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, TableComponent, ConfirmationModalComponent]
})
export class PaymentsComponent implements OnInit {
  loading = false;
  showDeleteModal = false;
  paymentToDelete: any = null;

  columns: ColumnDefinition[] = [
    { key: 'formattedPaymentDate', header: 'Data Pagamento' },
    { key: 'paymentMethodDescription', header: 'Método' },
    { key: 'patientName', header: 'Paciente' },
    { key: 'doctorName', header: 'Médico' },
    { key: 'formattedAppointmentDate', header: 'Data Consulta' }
  ];

  action: ActionDefinition[] = [
    { label: 'Visualizar', color: 'btn-info', icon: 'fa-eye', route: './view' },
    { label: 'Editar', color: 'btn-primary', icon: 'fa-edit', route: './edit' },
    { label: 'Excluir', color: 'btn-danger', icon: 'fa-trash', action: (item: any) => this.deletePayment(item) }
  ];

  pagedList: PagedList<any> = {
    items: [],
    pageNumber: 1,
    pageSize: 10,
    totalPages: 1,
    totalCount: 0
  };

  constructor(
    private router: Router,
    private toastService: ToastService,
    private paymentService: PaymentService
  ) { }

  ngOnInit(): void {
    this.loadPayments();
  }

  loadPayments(): void {
    this.loading = true;
    const paginationRequest = {
      ...this.pagedList,
      search: this.pagedList.search || ''
    };

    this.paymentService.pagination(paginationRequest)
      .then((response: any) => {
        // Formata as datas nos itens
        const formattedItems = (response.items || []).map((item: any) => ({
          ...item,
          formattedPaymentDate: this.formatDate(item.paymentDate),
          formattedAppointmentDate: this.formatDate(item.appointmentDate)
        }));

        this.pagedList = {
          items: formattedItems,
          pageNumber: response.pageNumber,
          pageSize: response.pageSize,
          totalCount: response.totalCount,
          totalPages: response.totalPages,
          search: response.search || ''
        };
        this.loading = false;
      })
      .catch(() => {
        this.toastService.show(
          'Erro ao carregar pagamentos',
          '#dc3545',
          '#ffffff',
          3000
        );
        this.loading = false;
      });
  }

  formatDate(value: any): string {
    if (!value) return 'Não informado';
    const date = new Date(value);
    return date.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  onPagedListChange(pagedList: PagedList<any>): void {
    this.pagedList = pagedList;
    this.loadPayments();
  }

  routerCreate(): void {
    this.router.navigate(['/payments/create']);
  }


  goBack(): void {
    this.router.navigate(['/home']);
  }

  deletePayment(payment: any): void {
    this.paymentToDelete = payment;
    this.showDeleteModal = true;
  }

  confirmDelete(): void {
    if (!this.paymentToDelete) return;

    this.showDeleteModal = false;
    this.paymentService.deletePayment(this.paymentToDelete.paymentId)
      .then((success: boolean) => {
        if (success) {
          this.toastService.show(
            'Pagamento excluído com sucesso!',
            '#28a745',
            '#ffffff',
            3000
          );
          this.loadPayments();
        } else {
          this.toastService.show(
            'Erro ao excluir pagamento.',
            '#dc3545',
            '#ffffff',
            4000
          );
        }
      })
      .catch((error: any) => {
        this.toastService.show(
          error?.error?.message || 'Erro ao excluir pagamento. Pode haver registros vinculados.',
          '#dc3545',
          '#ffffff',
          4000
        );
      })
      .finally(() => {
        this.paymentToDelete = null;
      });
  }

  cancelDelete(): void {
    this.showDeleteModal = false;
    this.paymentToDelete = null;
  }

  getDeleteModalBody(): string {
    if (!this.paymentToDelete) return '';
    
    const patientName = this.paymentToDelete.patientName || 'Não informado';
    const paymentMethod = this.paymentToDelete.paymentMethodDescription || 'Não informado';
    const paymentDate = this.paymentToDelete.formattedPaymentDate || 'Não informado';
    
    return `<div class="text-start">
              <p class="mb-3">Tem certeza que deseja excluir este pagamento?</p>
              <div class="alert alert-info mb-3">
                <strong>Paciente:</strong> ${patientName}<br>
                <strong>Método:</strong> ${paymentMethod}<br>
                <strong>Data:</strong> ${paymentDate}
              </div>
              <p class="text-danger mb-0"><strong>Esta ação não pode ser desfeita.</strong></p>
            </div>`;
  }
}
