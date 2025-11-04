import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TableComponent } from '../../shared/table/table.component';
import { ColumnDefinition, ActionDefinition, PagedList } from '../../shared/table/table.models';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, TableComponent]
})
export class AppointmentsComponent implements OnInit {
  loading = false;
  selectedStatus = 'all';

  columns: ColumnDefinition[] = [
    { key: 'patientName', header: 'Paciente' },
    { key: 'doctorName', header: 'Médico' },
    { key: 'specialty', header: 'Especialidade' },
    { key: 'date', header: 'Data' },
    { key: 'time', header: 'Horário' },
    { key: 'status', header: 'Status' }
  ];

  action: ActionDefinition[] = [
    { label: 'Editar', color: 'btn-primary', icon: 'fa-edit', route: './edit' },
    { label: 'Cancelar', color: 'btn-danger', icon: 'fa-times', route: './cancel' }
  ];

  pagedList: PagedList<any> = {
    items: [],
    pageNumber: 1,
    pageSize: 10,
    totalPages: 1,
    totalCount: 0
  };

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.loadAppointments();
  }

  loadAppointments(): void {
    this.loading = true;
    // Simulando dados de agendamentos - substituir por chamada real da API
    setTimeout(() => {
      const appointments = [
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
      
      this.pagedList = {
        items: appointments,
        pageNumber: 1,
        pageSize: 10,
        totalPages: 1,
        totalCount: appointments.length
      };
      
      this.loading = false;
    }, 1000);
  }

  onPagedListChange(pagedList: PagedList<any>): void {
    // Aqui você pode enviar para o backend e atualizar
    this.pagedList = pagedList;
    this.loadAppointments();
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

  goBack(): void {
    this.router.navigate(['/home']);
  }
}
