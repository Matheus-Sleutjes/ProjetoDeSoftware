import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TableComponent } from '../../shared/table/table.component';
import { ColumnDefinition, ActionDefinition, PagedList } from '../../shared/table/table.models';
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
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.loadPaymentMethods();
  }

  loadPaymentMethods(): void {
    this.loading = true;
    // Simulando dados de métodos de pagamento - substituir por chamada real da API
    setTimeout(() => {
      const paymentMethods = [
        {
          id: 1,
          name: 'Dr. João Silva',
          email: 'joao.silva@clinica.com',
          crm: '12345',
          specialty: 'Cardiologia',
          phone: '(65) 99999-9999'
        },
        {
          id: 2,
          name: 'Dra. Maria Santos',
          email: 'maria.santos@clinica.com',
          crm: '67890',
          specialty: 'Pediatria',
          phone: '(65) 88888-8888'
        },
        {
          id: 3,
          name: 'Dr. Pedro Costa',
          email: 'pedro.costa@clinica.com',
          crm: '54321',
          specialty: 'Ortopedia',
          phone: '(65) 77777-7777'
        }
      ];
      
      this.pagedList = {
        items: paymentMethods,
        pageNumber: 1,
        pageSize: 10,
        totalPages: 1,
        totalCount: paymentMethods.length
      };
      
      this.loading = false;
    }, 1000);
  }

  onPagedListChange(pagedList: PagedList<any>): void {
    this.pagedList = pagedList;
    this.loadPaymentMethods();
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
