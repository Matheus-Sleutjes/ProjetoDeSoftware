import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-specialties',
  templateUrl: './specialties.component.html',
  styleUrls: ['./specialties.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class SpecialtiesComponent implements OnInit {
  specialties: any[] = [];
  loading = false;
  searchTerm = '';

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.loadSpecialties();
  }

  loadSpecialties(): void {
    this.loading = true;
    // Simulando dados de especialidades - substituir por chamada real da API
    setTimeout(() => {
      this.specialties = [
        {
          id: 1,
          name: 'Cardiologia',
          description: 'Especialidade médica que se ocupa do diagnóstico e tratamento das doenças do coração',
          icon: 'fa-heart',
          color: 'danger',
          doctorCount: 5
        },
        {
          id: 2,
          name: 'Pediatria',
          description: 'Especialidade médica dedicada ao cuidado da saúde de crianças e adolescentes',
          icon: 'fa-child',
          color: 'primary',
          doctorCount: 8
        },
        {
          id: 3,
          name: 'Ortopedia',
          description: 'Especialidade médica que trata das doenças e lesões dos ossos, músculos e articulações',
          icon: 'fa-bone',
          color: 'warning',
          doctorCount: 3
        },
        {
          id: 4,
          name: 'Dermatologia',
          description: 'Especialidade médica que se ocupa do diagnóstico e tratamento das doenças da pele',
          icon: 'fa-hand-paper',
          color: 'info',
          doctorCount: 4
        },
        {
          id: 5,
          name: 'Neurologia',
          description: 'Especialidade médica que trata das doenças do sistema nervoso',
          icon: 'fa-brain',
          color: 'success',
          doctorCount: 2
        },
        {
          id: 6,
          name: 'Ginecologia',
          description: 'Especialidade médica que cuida da saúde da mulher',
          icon: 'fa-female',
          color: 'secondary',
          doctorCount: 6
        }
      ];
      this.loading = false;
    }, 1000);
  }

  searchSpecialties(): void {
    // Implementar busca quando necessário
  }

  addSpecialty(): void {
    alert('Funcionalidade de adicionar especialidade será implementada em breve!');
  }

  editSpecialty(specialty: any): void {
    alert(`Editar especialidade: ${specialty.name} - Funcionalidade será implementada em breve!`);
  }

  deleteSpecialty(specialty: any): void {
    if (confirm(`Tem certeza que deseja excluir a especialidade ${specialty.name}?`)) {
      alert(`Especialidade ${specialty.name} excluída! - Funcionalidade será implementada em breve!`);
    }
  }

  goBack(): void {
    this.router.navigate(['/home']);
  }

  getSpecialtyColor(color: string): string {
    const colors: { [key: string]: string } = {
      'danger': '#dc3545',
      'primary': '#1976d2',
      'warning': '#ffc107',
      'info': '#17a2b8',
      'success': '#28a745',
      'secondary': '#6c757d'
    };
    return colors[color] || '#6c757d';
  }
}
