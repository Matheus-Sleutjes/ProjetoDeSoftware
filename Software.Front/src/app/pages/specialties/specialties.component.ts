import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TableComponent } from '../../shared/table/table.component';
import { ColumnDefinition, ActionDefinition, PagedList } from '../../shared/table/table.models';

@Component({
  selector: 'app-specialties',
  templateUrl: './specialties.component.html',
  styleUrls: ['./specialties.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, TableComponent]
})
export class SpecialtiesComponent implements OnInit {
  loading = false;

  columns: ColumnDefinition[] = [
    { key: 'name', header: 'Nome' },
    { key: 'description', header: 'Descrição' },
    { key: 'doctorCount', header: 'Quantidade de Médicos' }
  ];

  action: ActionDefinition[] = [
    { label: 'Editar', color: 'btn-primary', icon: 'fa-edit', route: './edit' },
    { label: 'Excluir', color: 'btn-danger', icon: 'fa-trash', route: './delete' }
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
    this.loadSpecialties();
  }

  loadSpecialties(): void {
    this.loading = true;
    // Simulando dados de especialidades - substituir por chamada real da API
    setTimeout(() => {
      const specialties = [
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
      
      this.pagedList = {
        items: specialties,
        pageNumber: 1,
        pageSize: 10,
        totalPages: 1,
        totalCount: specialties.length
      };
      
      this.loading = false;
    }, 1000);
  }

  onPagedListChange(pagedList: PagedList<any>): void {
    // Aqui você pode enviar para o backend e atualizar
    this.pagedList = pagedList;
    this.loadSpecialties();
  }

  addSpecialty(): void {
    alert('Funcionalidade de adicionar especialidade será implementada em breve!');
  }

  editSpecialty(specialty: any): void {
    alert(`Editar especialidade: ${specialty.name} - Funcionalidade será implementada em breve!`);
  }

  goBack(): void {
    this.router.navigate(['/home']);
  }
}
