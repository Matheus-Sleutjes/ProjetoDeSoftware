import { Component } from '@angular/core';
import { HeaderComponent } from "../../../components_utils/header/header.component";
import { In_Users } from '../../../models/In_users';
import { SharedModule } from '../../../shared/shared.module';
import { HttpService } from '../../../services/http.service';
import { EnumRole } from '../../../models/enumRole';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-list-user',
    imports: [HeaderComponent, SharedModule],
    templateUrl: './list-user.component.html',
    styleUrl: './list-user.component.scss'
})
export class ListUserComponent {

    users: In_Users[] = [];

    filtered: In_Users[] = [];

    endPoit = 'GetAllByParameter';
    pararms = 0;
    displayedColumns: string[] = ['name', 'lastName', 'username', 'email', 'cpf', 'role', 'actions'];
    roles = [
        { value: 0, label: 'Todos' },
        { value: EnumRole.Administrador, label: 'Administrador' },
        { value: EnumRole.Medico, label: 'Médico' },
        { value: EnumRole.Paciente, label: 'Paciente' }
    ];
    selectedRole = 0;
    constructor(
        private restService: HttpService,
        private snackBar: MatSnackBar) {
    }


    ngOnInit(): void {
        this.getUsers();
        this.filtered = [...this.users];
        // valor inicial
        // ... resto do compo
    }

    applyRoleFilter() {
        // se for “Todos” (0), mostra tudo; senão filtra pelo value
        this.filtered = this.selectedRole === 0
            ? [...this.users]
            : this.users.filter((u: any) => u.role === this.selectedRole);
        this.getUsers(this.selectedRole);
    }


    async getUsers(params: number = 0) {
        await this.restService.get(this.endPoit, {
            roleId: params
        }).subscribe({
            next: (data: In_Users[]) => {
                this.users = data;
                this.filtered = [...this.users];
            },
            error: (err) => {
                console.error('Erro ao buscar usuários:', err);
                this.snackBar.open(err.error?.message || 'Erro buscar usuário', 'OK', { duration: 4000 });
            }
        });
    }

    edit(user: In_Users) {
        // aqui você poderia abrir um dialog ou navegar para um form de edição
        console.log('Editar', user);
    }

    delete(user: In_Users) {
        console.log('Deletar', user);
        this.restService.delete(`${user.id}`).subscribe((data) => {
            console.log('Usuário deletado com sucesso', data);
            this.snackBar.open('Usuário deletado com sucesso', 'OK', { duration: 4000 });
        })
        this.users = this.users.filter(u => u.username !== user.username);
        
    }
}
