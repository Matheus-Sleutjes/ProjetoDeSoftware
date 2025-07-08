import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { AppointmentService } from '../../../services/appointment.service';
import { HttpService } from '../../../services/http.service';
import { UtilsService } from '../../../services/utils.service';
import { Appointment } from '../../../models/In_Appointment';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from '../../util/confirm-dialog/confirm-dialog.component';


@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.scss'],
  imports: [SharedModule],
  standalone: true
})
export class AppointmentListComponent implements OnInit {
  appointments: Appointment[] = [];
  isLoading: boolean = false;
  userId: string = '';
  userRole: string = '';

  constructor(
    private appointmentService: AppointmentService,
    private httpService: HttpService,
    private utils: UtilsService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    const userInfo = this.utils.decodeJwt();
    this.userRole = userInfo?.acr?.toLowerCase() || '';

    // Obter ID do usuário
    this.httpService.getNotController('User/current-user').subscribe(
      (user) => {
        this.userId = user.id;
        this.loadAppointments();
      },
      (error) => {
        console.error('Erro ao obter dados do usuário', error);
      }
    );
  }

  loadAppointments() {
    this.isLoading = true;

    const appointmentObservable = this.userRole === 'doctor' ?
      this.appointmentService.getDoctorAppointments(this.userId) :
      this.appointmentService.getPatientAppointments(this.userId);

    appointmentObservable.subscribe(
      (appointments) => {
        this.appointments = appointments;
        this.isLoading = false;
      },
      (error) => {
        console.error('Erro ao carregar agendamentos:', error);
        this.isLoading = false;
        this.snackBar.open('Erro ao carregar agendamentos', 'Fechar', { duration: 3000 });
      }
    );
  }

  // cancelAppointment(appointment: Appointment) {
  //   const dialogRef = this.dialog.open(ConfirmDialogComponent, {
  //     data: {
  //       title: 'Cancelar Consulta',
  //       message: `Tem certeza que deseja cancelar a consulta em ${this.formatDate(appointment.appointmentDate)} às ${appointment.time}?`
  //     }
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result) {
  //       this.isLoading = true;
  //       this.appointmentService.cancelAppointment(appointment.id!).subscribe(
  //         () => {
  //           this.snackBar.open('Consulta cancelada com sucesso', 'Fechar', { duration: 3000 });
  //           this.loadAppointments();
  //         },
  //         (error) => {
  //           console.error('Erro ao cancelar consulta:', error);
  //           this.isLoading = false;
  //           this.snackBar.open('Erro ao cancelar consulta', 'Fechar', { duration: 3000 });
  //         }
  //       );
  //     }
  //   });
  // }

  rescheduleAppointment(appointment: Appointment) {
    // Implementar lógica de redirecionamento para tela de reagendamento
    // Pode ser implementada em um modal ou componente separado
  }

  getStatusLabel(status: string): string {
    const statusMap: { [key: string]: string } = {
      'scheduled': 'Agendada',
      'confirmed': 'Confirmada',
      'canceled': 'Cancelada',
      'completed': 'Concluída'
    };

    return statusMap[status] || status;
  }

  getStatusClass(status: string): string {
    const classMap: { [key: string]: string } = {
      'scheduled': 'status-scheduled',
      'confirmed': 'status-confirmed',
      'canceled': 'status-canceled',
      'completed': 'status-completed'
    };

    return classMap[status] || '';
  }

  formatDate(date: Date): string {
    const d = new Date(date);
    return d.toLocaleDateString('pt-BR');
  }
}