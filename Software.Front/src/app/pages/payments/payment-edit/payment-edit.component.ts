import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '../../../services/toast.service';
import { PaymentService } from '../../../services/payment.service';
import { PaymentMethodService } from '../../../services/payment-method.service';

@Component({
  selector: 'app-payment-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './payment-edit.component.html',
  styleUrl: './payment-edit.component.scss',
})
export class PaymentEditComponent implements OnInit {

  paymentForm!: FormGroup;
  paymentId!: number;
  loading = false;
  paymentMethods: any[] = [];

  constructor(
    private fb: FormBuilder,
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
        this.initializeForm();
        this.loadPaymentMethods();
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

  loadPaymentMethods(): void {
    this.paymentMethodService.getAllPaymentMethods().then(
      (methods: any[]) => {
        this.paymentMethods = methods || [];
      },
      () => {
        this.toastService.show(
          'Erro ao carregar métodos de pagamento',
          '#dc3545',
          '#ffffff',
          4000
        );
      }
    );
  }

  loadPayment(): void {
    this.loading = true;
    this.paymentService.getPaymentById(this.paymentId).then(
      (payment: any) => {
        const paymentDate = payment.paymentDate
          ? new Date(payment.paymentDate).toISOString().slice(0, 16)
          : '';
        this.paymentForm.patchValue({
          paymentDate: paymentDate,
          paymentMethodId: payment.paymentMethodId || '',
          userId: payment.userId || '',
          appointmentId: payment.appointmentId || ''
        });
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

  onSubmit(): void {
    if (this.paymentForm.invalid) {
      this.paymentForm.markAllAsTouched();
      this.toastService.show(
        'Por favor, preencha todos os campos obrigatórios corretamente.',
        '#dc3545',
        '#ffffff',
        4000
      );
      return;
    }

    this.loading = true;
    const paymentData = {
      paymentDate: this.paymentForm.value.paymentDate,
      paymentMethodId: this.paymentForm.value.paymentMethodId,
      userId: this.paymentForm.value.userId,
      appointmentId: this.paymentForm.value.appointmentId
    };

    this.paymentService.updatePayment(this.paymentId, paymentData)
      .then((success: boolean) => {
        if (success) {
          this.toastService.show(
            'Pagamento atualizado com sucesso!',
            '#28a745',
            '#ffffff',
            3000
          );
          this.goBack();
        } else {
          this.toastService.show(
            'Erro ao atualizar pagamento.',
            '#dc3545',
            '#ffffff',
            4000
          );
        }
      })
      .catch((error: any) => {
        this.toastService.show(
          error?.error?.message || 'Erro ao atualizar pagamento. Tente novamente.',
          '#dc3545',
          '#ffffff',
          4000
        );
      })
      .finally(() => {
        this.loading = false;
      });
  }

  initializeForm(): void {
    this.paymentForm = this.fb.group({
      paymentDate: ['', [Validators.required]],
      paymentMethodId: ['', [Validators.required]],
      userId: ['', [Validators.required]],
      appointmentId: ['', [Validators.required]]
    });
  }
}


