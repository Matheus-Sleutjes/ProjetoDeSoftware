import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class AppointmentsComponent implements OnInit {
  appointments: any[] = [];
  loading = false;
  searchTerm = '';
  selectedStatus = 'all';

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.loadAppointments();
  }

  loadAppointments(): void {
    this.loading = true;
    // Simulando dados de agendamentos - substituir por chamada real da API
    setTimeout(() => {
      this.appointments = [
        {
          id: 1,
          patientName: 'Ana Silva',
          doctorName: 'Dr. João Silva',
          specialty: 'Cardiologia',
          date: '15/01/2024',
          time: '14:30',
          status: 'Agendado',
          notes: 'Consulta de rotina'
        },
        {
          id: 2,
          patientName: 'Carlos Santos',
          doctorName: 'Dra. Maria Santos',
          specialty: 'Pediatria',
          date: '16/01/2024',
          time: '09:00',
          status: 'Concluído',
          notes: 'Retorno'
        },
        {
          id: 3,
          patientName: 'Maria Costa',
          doctorName: 'Dr. Pedro Costa',
          specialty: 'Ortopedia',
          date: '17/01/2024',
          time: '16:00',
          status: 'Cancelado',
          notes: 'Paciente cancelou'
        }
      ];
      this.loading = false;
    }, 1000);
  }

  searchAppointments(): void {
    // Implementar busca quando necessário
  }

  filterByStatus(): void {
    // Implementar filtro por status quando necessário
  }

  addAppointment(): void {
    alert('Funcionalidade de agendar consulta será implementada em breve!');
  }

  editAppointment(appointment: any): void {
    alert(`Editar agendamento: ${appointment.patientName} - Funcionalidade será implementada em breve!`);
  }

  cancelAppointment(appointment: any): void {
    if (confirm(`Tem certeza que deseja cancelar o agendamento de ${appointment.patientName}?`)) {
      alert(`Agendamento cancelado! - Funcionalidade será implementada em breve!`);
    }
  }

  getStatusBadgeClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'agendado': return 'badge bg-primary';
      case 'concluído': return 'badge bg-success';
      case 'cancelado': return 'badge bg-danger';
      default: return 'badge bg-secondary';
    }
  }

  goBack(): void {
    this.router.navigate(['/home']);
  }
}
