import { FormBuilder, FormGroup } from '@angular/forms';
import { In_CreateAccount } from './../../../models/In_createAccount';
import { Component } from '@angular/core';
import { HeaderComponent } from "../../../components_utils/header/header.component";
import { In_Users } from '../../../models/In_users';
import { SharedModule } from '../../../shared/shared.module';
import { HttpService } from '../../../services/http.service';
import { EnumRole } from '../../../models/enumRole';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EditUserDialogComponent } from '../edit-user-dialog/edit-user-dialog.component';
import { In_ConfirmDialog } from '../../../models/In_ConfirmDialog';
import { ConfirmDialogComponent } from '../../util/confirm-dialog/confirm-dialog.component';

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
        private snackBar: MatSnackBar,
        private dialog: MatDialog
        ) {
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
        const ref = this.dialog.open(EditUserDialogComponent, {
            width: '650px',
            data: user
        });

        ref.afterClosed().subscribe(updated => {
            if (updated) {
                this.getUsers(); // recarrega a lista
            }
        });
      }

    delete(user: In_Users) {
        const data: In_ConfirmDialog= {
            title: 'Excluir usuário',
            message: `Tem certeza que deseja excluir o usuário "${user.username}"?`,
            confirmText: 'Excluir',
            cancelText: 'Cancelar'
        };

        const ref = this.dialog.open(ConfirmDialogComponent, {
            width: '320px',
            data
        });

        ref.afterClosed().subscribe(confirmed => {
            if (!confirmed) return;

            this.restService.delete(`users/${user.userId}`).subscribe({
                next: () => {
                    this.snackBar.open('Usuário excluído com sucesso', 'OK', { duration: 4000 });
                    this.getUsers();
                },
                error: err => {
                    this.snackBar.open(err.error?.message || 'Erro ao excluir', 'OK', { duration: 4000 });
                }
            });
        });
      }
}
