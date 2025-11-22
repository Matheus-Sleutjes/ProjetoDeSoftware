import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TableComponent } from '../../shared/table/table.component';
import { ColumnDefinition, ActionDefinition, PagedList } from '../../shared/table/table.models';
import { ToastService } from '../../services/toast.service';
import { PaymentService } from '../../services/payment.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, TableComponent]
})
export class PaymentsComponent implements OnInit {
  loading = false;

  columns: ColumnDefinition[] = [
    { key: 'name', header: 'Nome' },
    { key: 'crm', header: 'CRM' },
    { key: 'specialty', header: 'Especialidade' },
    { key: 'email', header: 'Email' },
    { key: 'phone', header: 'Telefone' }
  ];

  action: ActionDefinition[] = [
    { label: 'Editar', color: 'btn-primary', icon: 'fa-edit', route: './edit' },
    { label: 'Excluir', color: 'btn-danger', icon: 'fa-trash', route: './delete' }
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
          'Erro ao carregar pagamentos',
          '#dc3545',
          '#ffffff',
          3000
        );
        this.loading = false;
      });
  }

  onPagedListChange(pagedList: PagedList<any>): void {
    this.pagedList = pagedList;
    this.loadPayments();
  }

  routerCreate(): void {
    this.router.navigate(['/payments/create']);
  }

  addPayment(): void {
    this.toastService.show(
      'Funcionalidade de adicionar pagamento será implementada em breve!',
      '#ffc107',
      '#000000',
      3000
    );
  }

  editPayment(payment: any): void {
    this.toastService.show(
      `Editar pagamento: ${payment.name} - Funcionalidade será implementada em breve!`,
      '#ffc107',
      '#000000',
      3000
    );
  }

  goBack(): void {
    this.router.navigate(['/home']);
  }
}
