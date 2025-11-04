import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TableComponent } from '../../shared/table/table.component';
import { ColumnDefinition, ActionDefinition, PagedList } from '../../shared/table/table.models';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, TableComponent]
})
export class DoctorsComponent implements OnInit {
  loading = false;

  columns: ColumnDefinition[] = [
    { key: 'name', header: 'Nome' },
    { key: 'crm', header: 'CRM' },
    { key: 'specialty', header: 'Especialidade' },
    { key: 'email', header: 'Email' },
    { key: 'phone', header: 'Telefone' }
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
    this.loadDoctors();
  }

  loadDoctors(): void {
    this.loading = true;
    // Simulando dados de médicos - substituir por chamada real da API
    setTimeout(() => {
      const doctors = [
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
      
      this.pagedList = {
        items: doctors,
        pageNumber: 1,
        pageSize: 10,
        totalPages: 1,
        totalCount: doctors.length
      };
      
      this.loading = false;
    }, 1000);
  }

  onPagedListChange(pagedList: PagedList<any>): void {
    // Aqui você pode enviar para o backend e atualizar
    this.pagedList = pagedList;
    this.loadDoctors();
  }

  addDoctor(): void {
    alert('Funcionalidade de adicionar médico será implementada em breve!');
  }

  editDoctor(doctor: any): void {
    alert(`Editar médico: ${doctor.name} - Funcionalidade será implementada em breve!`);
  }

  goBack(): void {
    this.router.navigate(['/home']);
  }
}
