import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TableComponent } from '../../shared/table/table.component';
import { ColumnDefinition, ActionDefinition, PagedList } from '../../shared/table/table.models';
import { PaymentMethodService } from '../../services/payment-method.service';
import { ToastService } from '../../services/toast.service';
import { ConfirmationModalComponent } from '../../shared/modal/confirmation-modal.component';

@Component({
  selector: 'app-payments-method',
  templateUrl: './payments-method.component.html',
  styleUrls: ['./payments-method.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, TableComponent, ConfirmationModalComponent]
})
export class PaymentsMethodComponent implements OnInit {
  loading = false;
  showDeleteModal = false;
  itemToDelete: any = null;
  deleteModalTitle = 'Excluir Método de Pagamento';
  deleteModalBody = '';

  columns: ColumnDefinition[] = [
    { key: 'paymentMethodId', header: 'ID' },
    { key: 'description', header: 'Descrição' }
  ];

  action: ActionDefinition[] = [
    { label: 'Visualizar', color: 'btn-info', icon: 'fa-eye', route: './view' },
    { label: 'Editar', color: 'btn-primary', icon: 'fa-edit', route: './edit' },
    { label: 'Remover', color: 'btn-danger', icon: 'fa-trash', action: (item: any) => this.openDeleteModal(item) }
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
    private paymentMethodService: PaymentMethodService
  ) { }

  ngOnInit(): void {
    this.loadPaymentMethods();
  }

  loadPaymentMethods(): void {
    this.loading = true;
    const paginationRequest = {
      ...this.pagedList,
      search: this.pagedList.search || ''
    };

    this.paymentMethodService.pagination(paginationRequest)
      .then((response: any) => {
        this.pagedList = {
          items: response.items || [],
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
          'Erro ao carregar métodos de pagamento',
          '#dc3545',
          '#ffffff',
          3000
        );
        this.loading = false;
      });
  }

  onPagedListChange(pagedList: PagedList<any>): void {
    this.pagedList = pagedList;
    this.loadPaymentMethods();
  }

  routerCreate(): void {
    this.router.navigate(['/payments-method/create']);
  }

  openDeleteModal(item: any): void {
    this.itemToDelete = item;
    const itemName = item.description || `Método ${item.paymentMethodId}`;
    this.deleteModalTitle = 'Excluir Método de Pagamento';
    this.deleteModalBody = `
      <div class="text-start">
        <p class="mb-3">Tem certeza que deseja excluir este método de pagamento?</p>
        <div class="alert alert-info mb-3">
          <strong>Descrição:</strong> ${itemName}
        </div>
        <p class="text-danger mb-0"><strong>Esta ação não pode ser desfeita.</strong></p>
      </div>`;
    this.showDeleteModal = true;
  }

  confirmDelete(): void {
    if (this.itemToDelete) {
      this.loading = true;
      this.paymentMethodService.deletePaymentMethod(this.itemToDelete.paymentMethodId).then(
        (success: boolean) => {
          if (success) {
            this.toastService.show(
              'Método de pagamento excluído com sucesso!',
              '#28a745',
              '#ffffff',
              3000
            );
            this.loadPaymentMethods();
          } else {
            this.toastService.show(
              'Erro ao excluir método de pagamento.',
              '#dc3545',
              '#ffffff',
              4000
            );
          }
          this.loading = false;
          this.closeDeleteModal();
        },
        (err: any) => {
          this.toastService.show(
            err.error?.message || 'Erro ao excluir método de pagamento. Pode haver pagamentos vinculados.',
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
    this.deleteModalTitle = 'Excluir Método de Pagamento';
    this.deleteModalBody = '';
  }

  goBack(): void {
    this.router.navigate(['/home']);
  }
}
