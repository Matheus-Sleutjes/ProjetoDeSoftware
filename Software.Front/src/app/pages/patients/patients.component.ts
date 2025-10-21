import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class PatientsComponent implements OnInit {
  patients: any[] = [];
  loading = false;
  searchTerm = '';

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.loadPatients();
  }

  loadPatients(): void {
    this.loading = true;
    // Simulando dados de pacientes - substituir por chamada real da API
    setTimeout(() => {
      this.patients = [
        {
          id: 1,
          name: 'Ana Silva',
          email: 'ana.silva@email.com',
          cpf: '123.456.789-00',
          phone: '(65) 99999-9999',
          birthDate: '15/03/1990',
          address: 'Rua das Flores, 123'
        },
        {
          id: 2,
          name: 'Carlos Santos',
          email: 'carlos.santos@email.com',
          cpf: '987.654.321-00',
          phone: '(65) 88888-8888',
          birthDate: '22/07/1985',
          address: 'Av. Principal, 456'
        },
        {
          id: 3,
          name: 'Maria Costa',
          email: 'maria.costa@email.com',
          cpf: '456.789.123-00',
          phone: '(65) 77777-7777',
          birthDate: '10/12/1992',
          address: 'Rua da Paz, 789'
        }
      ];
      this.loading = false;
    }, 1000);
  }

  searchPatients(): void {
    // Implementar busca quando necessário
  }

  addPatient(): void {
    alert('Funcionalidade de adicionar paciente será implementada em breve!');
  }

  editPatient(patient: any): void {
    alert(`Editar paciente: ${patient.name} - Funcionalidade será implementada em breve!`);
  }

  deletePatient(patient: any): void {
    if (confirm(`Tem certeza que deseja excluir o paciente ${patient.name}?`)) {
      alert(`Paciente ${patient.name} excluído! - Funcionalidade será implementada em breve!`);
    }
  }

  goBack(): void {
    this.router.navigate(['/home']);
  }

  getInitials(name: string): string {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  }
}
