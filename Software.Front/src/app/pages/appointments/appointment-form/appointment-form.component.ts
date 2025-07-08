import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { UtilsService } from '../../../services/utils.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Appointment, TimeSlot } from '../../../models/In_Appointment';
import { HttpService } from '../../../services/http.service';
import { AppointmentService } from '../../../services/appointment.service';
import { In_Users } from '../../../models/In_users';
import { EnumRole } from '../../../models/enumRole';

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
  availableTimeSlots: TimeSlot[] = [{ time: '08:00', available: true },
  { time: '09:00', available: true },
  { time: '10:00', available: false },
  { time: '11:00', available: true },
  { time: '12:00', available: true },
  { time: '13:00', available: true },
  { time: '14:00', available: false },
  { time: '15:00', available: true },
  { time: '16:00', available: true },
  { time: '17:00', available: true },
  { time: '18:00', available: true }];
  isLoading: boolean = false;
  userId: string = '';
  userName: string = '';
  userRole: string = '';
  minDate = new Date();

  isDoctor: boolean = false;
  selectDoctor: string = '';

  endPoitDoctor = 'GetAllByParameter';
  endPointAppointment = 'Appointment';
  constructor(
    private fb: FormBuilder,
    private utils: UtilsService,
    private httpService: HttpService,
    private snackBar: MatSnackBar,
    private restService: HttpService
  ) {
    this.appointmentForm = this.fb.group({
      doctorId: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit() {
    const userInfo = this.utils.decodeJwt();
    this.userName = userInfo?.name || '';
    this.userRole = userInfo?.acr?.toLowerCase() || '';

    // Obter ID do usuário

    // Caso a especialidade tenha sido informada, buscar médicos dessa especialidade
    // if (this.speciality) {
    //   this.loadDoctorsBySpeciality(this.speciality);
    // }

    // Observar mudanças no campo de data
    // this.appointmentForm.get('date')?.valueChanges.subscribe(date => {
    //   const doctorId = this.appointmentForm.get('doctorId')?.value;
    //   if (date && doctorId) {
    //     this.loadAvailableTimeSlots(this.formatDate(date), doctorId);
    //   }
    // });

    // // Observar mudanças no campo de médico
    // this.appointmentForm.get('doctorId')?.valueChanges.subscribe(doctorId => {
    //   const date = this.appointmentForm.get('date')?.value;
    //   if (doctorId && date) {
    //     this.loadAvailableTimeSlots(this.formatDate(date), doctorId);
    //   }
    // });


    this.getDoctor();
  }


  async getDoctor() {
    let params: number = EnumRole.Medico //medico 
    await this.restService.get(this.endPoitDoctor, {
      roleId: params
    }).subscribe({
      next: (data: In_Users[]) => {
        this.availableDoctors = [...data]; // Atualiza filtered com os novos dados
        console.log('Usuários filtrados:', this.availableDoctors);
      },
      error: (err) => {
        console.error('Erro ao buscar usuários:', err);
        this.snackBar.open(err.error?.message || 'Erro buscar usuário', 'OK', { duration: 4000 });
      }
    });
  }

  // loadDoctorsBySpeciality(speciality: string) {
  //   this.isLoading = true;
  //   this.httpService.getNotController(`Doctor/by-speciality/${speciality}`).subscribe(
  //     (doctors) => {
  //       this.availableDoctors = doctors;
  //       this.isLoading = false;
  //     },
  //     (error) => {
  //       console.error('Erro ao carregar médicos:', error);
  //       this.isLoading = false;
  //       this.snackBar.open('Erro ao carregar médicos disponíveis', 'Fechar', { duration: 3000 });
  //     }
  //   );
  // }

  // loadAvailableTimeSlots(date: string, doctorId: string) {
  //   this.isLoading = true;
  //   this.appointmentService.getAvailableTimeSlots(date, doctorId).subscribe(
  //     (slots) => {
  //       this.availableTimeSlots = slots;
  //       this.isLoading = false;
  //     },
  //     (error) => {
  //       console.error('Erro ao carregar horários disponíveis:', error);
  //       this.isLoading = false;
  //       this.snackBar.open('Erro ao carregar horários disponíveis', 'Fechar', { duration: 3000 });
  //     }
  //   );
  // }

  onSubmit() {
    if (this.appointmentForm.valid) {
      this.isLoading = true;

      // Encontrar nome do médico selecionado
      const selectedDoctor = this.availableDoctors.find(
        doctor => doctor.id === this.appointmentForm.value.doctorId
      );

      const appointmentData: Appointment = {
        patientId: 1,
        doctorId: this.appointmentForm.value.doctorId,
        appointmentDate: this.appointmentForm.value.date, 
        // time: this.appointmentForm.value.time,
        description: this.appointmentForm.value.description,
        status: 1, // 0: Agendada
      };

      this.restService.post(this.endPointAppointment, appointmentData).subscribe(
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