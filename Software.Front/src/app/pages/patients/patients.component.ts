import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TableComponent } from '../../shared/table/table.component';
import { ColumnDefinition, ActionDefinition, PagedList } from '../../shared/table/table.models';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, TableComponent]
})
export class PatientsComponent implements OnInit {
  loading = false;

  columns: ColumnDefinition[] = [
    { key: 'name', header: 'Nome' },
    { key: 'cpf', header: 'CPF' },
    { key: 'email', header: 'Email' },
    { key: 'phone', header: 'Telefone' },
    { key: 'birthDate', header: 'Data Nascimento' }
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
    this.loadPatients();
  }

  loadPatients(): void {
    this.loading = true;
    // Simulando dados de pacientes - substituir por chamada real da API
    setTimeout(() => {
      const patients = [
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
      
      this.pagedList = {
        items: patients,
        pageNumber: 1,
        pageSize: 10,
        totalPages: 1,
        totalCount: patients.length
      };
      
      this.loading = false;
    }, 1000);
  }

  onPagedListChange(pagedList: PagedList<any>): void {
    // Aqui você pode enviar para o backend e atualizar
    this.pagedList = pagedList;
    this.loadPatients();
  }

  addPatient(): void {
    alert('Funcionalidade de adicionar paciente será implementada em breve!');
  }

  editPatient(patient: any): void {
    alert(`Editar paciente: ${patient.name} - Funcionalidade será implementada em breve!`);
  }

  goBack(): void {
    this.router.navigate(['/home']);
  }
}
