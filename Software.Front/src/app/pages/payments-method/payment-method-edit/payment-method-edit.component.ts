import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '../../../services/toast.service';
import { PaymentMethodService } from '../../../services/payment-method.service';
import { PaymentMethodDto } from '../../../models/PaymentMethodDto';

@Component({
  selector: 'app-payment-method-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './payment-method-edit.component.html',
  styleUrl: './payment-method-edit.component.scss',
})
export class PaymentMethodEditComponent implements OnInit {

  methodForm!: FormGroup;
  methodId!: number;
  loading = false;

  constructor(
    private fb: FormBuilder,
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
        this.initializeForm();
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
        this.methodForm.patchValue({
          description: method.description || ''
        });
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
      paymentMethodId: this.methodId
    };

    this.paymentMethodService.updatePaymentMethod(this.methodId, methodData)
      .then((success: boolean) => {
        if (success) {
          this.toastService.show(
            'Método de pagamento atualizado com sucesso!',
            '#28a745',
            '#ffffff',
            3000
          );
          this.goBack();
        } else {
          this.toastService.show(
            'Erro ao atualizar método de pagamento.',
            '#dc3545',
            '#ffffff',
            4000
          );
        }
      })
      .catch((error: any) => {
        this.toastService.show(
          error?.error?.message || 'Erro ao atualizar método de pagamento. Tente novamente.',
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


