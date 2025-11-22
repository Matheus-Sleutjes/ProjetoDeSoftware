import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, Location } from '@angular/common';
import { Router } from '@angular/router';
import { ToastService } from '../../../services/toast.service';
import { PaymentService } from '../../../services/payment.service';
import { PaymentMethodService } from '../../../services/payment-method.service';
import { AppointmentService } from '../../../services/appointment.service';

@Component({
  selector: 'app-payment-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './payment-create.component.html',
  styleUrl: './payment-create.component.scss',
})
export class PaymentCreateComponent implements OnInit {

  paymentForm!: FormGroup;
  loading = false;
  paymentMethods: any[] = [];
  appointments: any[] = [];

  constructor(
    private fb: FormBuilder,
    private paymentService: PaymentService,
    private paymentMethodService: PaymentMethodService,
    private appointmentService: AppointmentService,
    private router: Router,
    private toastService: ToastService,
    private location: Location,
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.loadPaymentMethods();
    this.loadAppointments();
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

  loadAppointments(): void {
    this.appointmentService.getAvailableForPayment().then(
      (appointments: any[]) => {
        this.appointments = appointments || [];
      },
      () => {
        this.toastService.show(
          'Erro ao carregar agendamentos disponíveis',
          '#dc3545',
          '#ffffff',
          4000
        );
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

    this.paymentService.createPayment(paymentData)
      .then((success: boolean) => {
        if (success) {
          this.toastService.show(
            'Pagamento criado com sucesso!',
            '#28a745',
            '#ffffff',
            3000
          );
          this.paymentForm.reset();
          this.initializeForm();
        } else {
          this.toastService.show(
            'Erro ao criar pagamento.',
            '#dc3545',
            '#ffffff',
            4000
          );
        }
      })
      .catch((error: any) => {
        this.toastService.show(
          error?.error?.message || 'Erro ao criar pagamento. Tente novamente.',
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


