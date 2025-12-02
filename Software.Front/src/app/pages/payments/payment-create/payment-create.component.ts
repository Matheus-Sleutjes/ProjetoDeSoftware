import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, Location } from '@angular/common';
import { Router } from '@angular/router';
import { ToastService } from '../../../services/toast.service';
import { PaymentService } from '../../../services/payment.service';
import { PaymentDto } from '../../../models/PaymentDto';
import { PaymentMethodService } from '../../../services/payment-method.service';
import { AppointmentService } from '../../../services/appointment.service';
import { AutocompleteComponent, AutocompleteOption } from '../../../components/autocomplete/autocomplete.component';

@Component({
  selector: 'app-payment-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AutocompleteComponent],
  templateUrl: './payment-create.component.html',
  styleUrl: './payment-create.component.scss',
})
export class PaymentCreateComponent implements OnInit {

  paymentForm!: FormGroup;
  loading = false;
  paymentMethodOptions: AutocompleteOption[] = [];
  appointmentOptions: AutocompleteOption[] = [];

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
        this.paymentMethodOptions = (methods || []).map(method => ({
          id: method.paymentMethodId,
          displayLabel: method.description || `Método ${method.paymentMethodId}`,
          data: method
        }));
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
        this.appointmentOptions = (appointments || []).map(a => ({
          id: a.appointmentId,
          displayLabel: this.formatAppointmentLabel(a),
          data: a
        }));
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
    const paymentData: PaymentDto = {
      paymentDate: this.paymentForm.value.paymentDate,
      paymentMethodId: this.paymentForm.value.paymentMethodId,
      // userId será definido no backend a partir do token
      userId: 0,
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
          this.router.navigate(['/payments']);
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
      appointmentId: ['', [Validators.required]]
    });
  }

  onAppointmentSearch(term: string): void {
    // Filtro local - pode ser substituído por busca no backend se necessário
    this.loadAppointments();
  }

  onPaymentMethodSearch(term: string): void {
    // Filtro local - pode ser substituído por busca no backend se necessário
    this.loadPaymentMethods();
  }

  private formatAppointmentLabel(appointment: any): string {
    if (!appointment) return '';
    const date = appointment.appointmentDate ? new Date(appointment.appointmentDate) : null;
    const formattedDate = date
      ? date.toLocaleString('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      : '';
    const name = appointment.patientName || `Paciente ${appointment.patientId}`;
    return `${formattedDate} - ${name}`;
  }
}


