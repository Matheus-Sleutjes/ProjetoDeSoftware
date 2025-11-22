import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '../../../services/toast.service';
import { PaymentMethodService } from '../../../services/payment-method.service';

@Component({
  selector: 'app-payment-method-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payment-method-view.component.html',
  styleUrl: './payment-method-view.component.scss',
})
export class PaymentMethodViewComponent implements OnInit {

  method: any = {};
  methodId!: number;
  loading = false;

  constructor(
    private paymentMethodService: PaymentMethodService,
    private router: Router,
    private route: ActivatedRoute,
    private toastService: ToastService,
    private location: Location,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.methodId = +params['id'];
      if (this.methodId) {
        this.loadMethod();
      } else {
        this.toastService.show(
          'ID do método de pagamento não fornecido.',
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

  loadMethod(): void {
    this.loading = true;
    this.paymentMethodService.getPaymentMethodById(this.methodId).then(
      (method: any) => {
        this.method = method;
        this.loading = false;
      },
      (error: any) => {
        this.toastService.show(
          error.error?.message || 'Erro ao carregar dados do método de pagamento.',
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


