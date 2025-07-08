import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { UtilsService } from '../../../services/utils.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Appointment, TimeSlot } from '../../../models/In_Appointment';
import { HttpService } from '../../../services/http.service';
import { AppointmentService } from '../../../services/appointment.service';

@Component({
  selector: 'app-appointment-form',
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.scss'],
  imports: [SharedModule],
  standalone: true
})
export class AppointmentFormComponent implements OnInit {
  @Input() speciality: string = '';

  appointmentForm: FormGroup;
  availableDoctors: any[] = [];
  availableTimeSlots: TimeSlot[] = [];
  isLoading: boolean = false;
  userId: string = '';
  userName: string = '';
  userRole: string = '';
  minDate = new Date();

  constructor(
    private fb: FormBuilder,
    private utils: UtilsService,
    private httpService: HttpService,
    private snackBar: MatSnackBar,
    private appointmentService: AppointmentService
  ) {
    this.appointmentForm = this.fb.group({
      doctorId: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      notes: ['']
    });
  }

  ngOnInit() {
    const userInfo = this.utils.decodeJwt();
    this.userName = userInfo?.name || '';
    this.userRole = userInfo?.acr?.toLowerCase() || '';

    // Obter ID do usuário
    this.httpService.getNotController('Doctor').subscribe(
      (user) => {
        this.userId = user.id;
        console.log('ID do usuário:', user);
      },
      (error) => {
        console.error('Erro ao obter dados do usuário', error);
      }
    );

    // Caso a especialidade tenha sido informada, buscar médicos dessa especialidade
    if (this.speciality) {
      this.loadDoctorsBySpeciality(this.speciality);
    }

    // Observar mudanças no campo de data
    this.appointmentForm.get('date')?.valueChanges.subscribe(date => {
      const doctorId = this.appointmentForm.get('doctorId')?.value;
      if (date && doctorId) {
        this.loadAvailableTimeSlots(this.formatDate(date), doctorId);
      }
    });

    // Observar mudanças no campo de médico
    this.appointmentForm.get('doctorId')?.valueChanges.subscribe(doctorId => {
      const date = this.appointmentForm.get('date')?.value;
      if (doctorId && date) {
        this.loadAvailableTimeSlots(this.formatDate(date), doctorId);
      }
    });
  }

  loadDoctorsBySpeciality(speciality: string) {
    this.isLoading = true;
    this.httpService.getNotController(`Doctor/by-speciality/${speciality}`).subscribe(
      (doctors) => {
        this.availableDoctors = doctors;
        this.isLoading = false;
      },
      (error) => {
        console.error('Erro ao carregar médicos:', error);
        this.isLoading = false;
        this.snackBar.open('Erro ao carregar médicos disponíveis', 'Fechar', { duration: 3000 });
      }
    );
  }

  loadAvailableTimeSlots(date: string, doctorId: string) {
    this.isLoading = true;
    this.appointmentService.getAvailableTimeSlots(date, doctorId).subscribe(
      (slots) => {
        this.availableTimeSlots = slots;
        this.isLoading = false;
      },
      (error) => {
        console.error('Erro ao carregar horários disponíveis:', error);
        this.isLoading = false;
        this.snackBar.open('Erro ao carregar horários disponíveis', 'Fechar', { duration: 3000 });
      }
    );
  }

  onSubmit() {
    if (this.appointmentForm.valid) {
      this.isLoading = true;

      // Encontrar nome do médico selecionado
      const selectedDoctor = this.availableDoctors.find(
        doctor => doctor.id === this.appointmentForm.value.doctorId
      );

      const appointmentData: Appointment = {
        patientId: this.userId,
        patientName: this.userName,
        doctorId: this.appointmentForm.value.doctorId,
        doctorName: selectedDoctor?.name || '',
        speciality: this.speciality,
        date: this.appointmentForm.value.date,
        time: this.appointmentForm.value.time,
        status: 'Agendado',
        notes: this.appointmentForm.value.notes
      };

      this.appointmentService.createAppointment(appointmentData).subscribe(
        (response) => {
          this.isLoading = false;
          this.snackBar.open('Consulta agendada com sucesso!', 'Fechar', { duration: 3000 });
          this.appointmentForm.reset();
        },
        (error) => {
          this.isLoading = false;
          console.error('Erro ao agendar consulta:', error);
          this.snackBar.open('Erro ao agendar consulta', 'Fechar', { duration: 3000 });
        }
      );
    } else {
      // Marcar todos os campos como touched para mostrar erros de validação
      Object.keys(this.appointmentForm.controls).forEach(key => {
        this.appointmentForm.get(key)?.markAsTouched();
      });
    }
  }

  formatDate(date: Date): string {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }
}