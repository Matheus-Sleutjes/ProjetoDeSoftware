import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class PaymentsComponent implements OnInit {
  doctors: any[] = [];
  loading = false;
  searchTerm = '';

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.loadDoctors();
  }

  loadDoctors(): void {
    this.loading = true;
    // Simulando dados de médicos - substituir por chamada real da API
    setTimeout(() => {
      this.doctors = [
        {
          id: 1,
          name: 'Dr. João Silva',
          email: 'joao.silva@clinica.com',
          crm: '12345',
          specialty: 'Cardiologia',
          phone: '(65) 99999-9999'
        },
        {
          id: 2,
          name: 'Dra. Maria Santos',
          email: 'maria.santos@clinica.com',
          crm: '67890',
          specialty: 'Pediatria',
          phone: '(65) 88888-8888'
        },
        {
          id: 3,
          name: 'Dr. Pedro Costa',
          email: 'pedro.costa@clinica.com',
          crm: '54321',
          specialty: 'Ortopedia',
          phone: '(65) 77777-7777'
        }
      ];
      this.loading = false;
    }, 1000);
  }

  searchDoctors(): void {
    // Implementar busca quando necessário
  }

  addDoctor(): void {
    alert('Funcionalidade de adicionar médico será implementada em breve!');
  }

  editDoctor(doctor: any): void {
    alert(`Editar médico: ${doctor.name} - Funcionalidade será implementada em breve!`);
  }

  deleteDoctor(doctor: any): void {
    if (confirm(`Tem certeza que deseja excluir o médico ${doctor.name}?`)) {
      alert(`Médico ${doctor.name} excluído! - Funcionalidade será implementada em breve!`);
    }
  }

  goBack(): void {
    this.router.navigate(['/home']);
  }

  getInitials(name: string): string {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  }
}
