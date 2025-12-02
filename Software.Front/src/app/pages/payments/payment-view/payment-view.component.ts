import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '../../../services/toast.service';
import { PaymentService } from '../../../services/payment.service';
import { PaymentMethodService } from '../../../services/payment-method.service';

@Component({
  selector: 'app-payment-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payment-view.component.html',
  styleUrl: './payment-view.component.scss',
})
export class PaymentViewComponent implements OnInit {

  payment: any = {};
  paymentMethod: any = {};
  paymentId!: number;
  loading = false;

  constructor(
    private paymentService: PaymentService,
    private paymentMethodService: PaymentMethodService,
    private router: Router,
    private route: ActivatedRoute,
    private toastService: ToastService,
    private location: Location,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.paymentId = +params['id'];
      if (this.paymentId) {
        this.loadPayment();
      } else {
        this.toastService.show(
          'ID do pagamento não fornecido.',
          '#dc3545',
          '#ffffff',
          4000
        );
        this.goBack();
      }
    });
  }

  goBack(): void {
    this.location.back();
  }

  formatDateTime(dateTime: string): string {
    if (!dateTime) return 'Não informado';
    const date = new Date(dateTime);
    return date.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  loadPayment(): void {
    this.loading = true;
    this.paymentService.getPaymentById(this.paymentId).then(
      (payment: any) => {
        this.payment = payment;
        if (payment.paymentMethodId) {
          this.paymentMethodService.getPaymentMethodById(payment.paymentMethodId).then(
            (method: any) => {
              this.paymentMethod = method;
            },
            () => { }
          );
        }
        this.loading = false;
      },
      (error: any) => {
        this.toastService.show(
          error.error?.message || 'Erro ao carregar dados do pagamento.',
          '#dc3545',
          '#ffffff',
          4000
        );
        this.loading = false;
        this.goBack();
      }
    );
  }
}


