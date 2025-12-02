import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, Location } from '@angular/common';
import { Router } from '@angular/router';
import { ToastService } from '../../../services/toast.service';
import { PaymentMethodService } from '../../../services/payment-method.service';
import { PaymentMethodDto } from '../../../models/PaymentMethodDto';

@Component({
  selector: 'app-payment-method-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './payment-method-create.component.html',
  styleUrl: './payment-method-create.component.scss',
})
export class PaymentMethodCreateComponent implements OnInit {

  methodForm!: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private paymentMethodService: PaymentMethodService,
    private router: Router,
    private toastService: ToastService,
    private location: Location,
  ) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  goBack(): void {
    this.location.back();
  }

  onSubmit(): void {
    if (this.methodForm.invalid) {
      this.methodForm.markAllAsTouched();
      this.toastService.show(
        'Por favor, preencha todos os campos obrigatórios corretamente.',
        '#dc3545',
        '#ffffff',
        4000
      );
      return;
    }

    this.loading = true;
    const methodData: PaymentMethodDto = {
      description: this.methodForm.value.description,
      paymentMethodId: 0
    };

    this.paymentMethodService.createPaymentMethod(methodData)
      .then((success: boolean) => {
        if (success) {
          this.toastService.show(
            'Método de pagamento criado com sucesso!',
            '#28a745',
            '#ffffff',
            3000
          );
          this.router.navigate(['/payments-method']);
        } else {
          this.toastService.show(
            'Erro ao criar método de pagamento.',
            '#dc3545',
            '#ffffff',
            4000
          );
        }
      })
      .catch((error: any) => {
        this.toastService.show(
          error?.error?.message || 'Erro ao criar método de pagamento. Tente novamente.',
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
    this.methodForm = this.fb.group({
      description: ['', [Validators.required]]
    });
  }
}


