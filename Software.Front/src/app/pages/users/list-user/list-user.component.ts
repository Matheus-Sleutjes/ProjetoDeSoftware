import { Component } from '@angular/core';
import { HeaderComponent } from "../../../components_utils/header/header.component";
import { In_Users } from '../../../models/In_users';
import { share } from 'rxjs';
import { SharedModule } from '../../../shared/shared.module';

@Component({
    selector: 'app-list-user',
    imports: [HeaderComponent, SharedModule],
    templateUrl: './list-user.component.html',
    styleUrl: './list-user.component.scss'
})
export class ListUserComponent {

    users: In_Users[] = [
        { name: 'Ana', lastName: 'Silva', username: 'ana.silva', email: 'ana.silva@mail.com', cpf: '123.456.789-00', role: 'Médico' },
        { name: 'Bruno', lastName: 'Costa', username: 'bruno.costa', email: 'bruno.costa@mail.com', cpf: '987.654.321-11', role: 'Paciente' },
        { name: 'Carla', lastName: 'Pereira', username: 'carla.pereira', email: 'carla.p@mail.com', cpf: '111.222.333-44', role: 'Médico' },
        { name: 'Daniel', lastName: 'Almeida', username: 'daniel.almeida', email: 'dan.almeida@mail.com', cpf: '555.666.777-88', role: 'Paciente' },
        { name: 'Elisa', lastName: 'Fernandes', username: 'elisa.fern', email: 'elisa.fern@mail.com', cpf: '999.888.777-66', role: 'Médico' }
    ];

    filtered: In_Users[] = [];
    roles = ['', 'Médico', 'Paciente'];
    selectedRole = '';
    constructor() {

    }

    displayedColumns: string[] = ['name', 'lastName', 'username', 'email', 'cpf', 'role', 'actions'];

    ngOnInit(): void {
        this.filtered = [...this.users];
    }

    applyRoleFilter() {
        this.filtered = this.selectedRole
            ? this.users.filter(u => u.role === this.selectedRole)
            : [...this.users];
    }

    edit(user: In_Users) {
        // aqui você poderia abrir um dialog ou navegar para um form de edição
        console.log('Editar', user);
    }

    delete(user: In_Users) {
        this.users = this.users.filter(u => u.username !== user.username);
        this.applyRoleFilter();
    }
}
