import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TableComponent } from '../../shared/table/table.component';
import { ColumnDefinition, ActionDefinition, PagedList } from '../../shared/table/table.models';
import { PaymentMethodService } from '../../services/payment-method.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-payments-method',
  templateUrl: './payments-method.component.html',
  styleUrls: ['./payments-method.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, TableComponent]
})
export class PaymentsMethodComponent implements OnInit {
  loading = false;

  columns: ColumnDefinition[] = [
    { key: 'paymentMethodId', header: 'ID' },
    { key: 'description', header: 'Descrição' }
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

  addPaymentMethod(): void {
    this.toastService.show(
      'Funcionalidade de adicionar método de pagamento será implementada em breve!',
      '#ffc107',
      '#000000',
      3000
    );
  }

  editPaymentMethod(paymentMethod: any): void {
    this.toastService.show(
      `Editar método de pagamento: ${paymentMethod.name} - Funcionalidade será implementada em breve!`,
      '#ffc107',
      '#000000',
      3000
    );
  }

  goBack(): void {
    this.router.navigate(['/home']);
  }
}
