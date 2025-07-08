import { Component } from '@angular/core';
import { HeaderComponent } from "../../util/header/header.component";
import { In_Users } from '../../../models/In_users';
import { SharedModule } from '../../../shared/shared.module'; // Mantendo SharedModule
import { HttpService } from '../../../services/http.service';
import { EnumRole } from '../../../models/enumRole';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { EditUserDialogComponent } from '../edit-user-dialog/edit-user-dialog.component';
import { In_ConfirmDialog } from '../../../models/In_ConfirmDialog';
import { ConfirmDialogComponent } from '../../util/confirm-dialog/confirm-dialog.component';
import { UtilsService } from '../../../services/utils.service';
import { DoctorComponent } from '../doctor/doctor.component';

// Importe MatTooltipModule diretamente aqui se ele não estiver sendo exportado pelo SharedModule
import { MatTooltipModule } from '@angular/material/tooltip';


@Component({
    selector: 'app-list-user',
    standalone: true,
    imports: [
        HeaderComponent,
        SharedModule, // Re-incluído, pois você quer usá-lo
        MatTooltipModule, // Adicionado aqui para o matTooltip funcionar
    ],
    templateUrl: './list-user.component.html',
    styleUrl: './list-user.component.scss'
})
export class ListUserComponent {
    filtered: any[] = [];

    endPoit = 'GetAllByParameter';
    pararms = 0;

    selectedRole = 0;
    roleUser = EnumRole;

    acrRole = '';
    roles: { value: number, label: string }[] = [];

    constructor(
        private restService: HttpService,
        private snackBar: MatSnackBar,
        private dialog: MatDialog,
        private util: UtilsService
    ) { }

    ngOnInit(): void {
        this.getUsers();
        // this.filtered = [...this.users]; // Isso será sobrescrito por getUsers

        const urlParams = this.util.getParametersFromUrl();
        const name = urlParams.name || '';
        this.acrRole = urlParams.acr || '';

        this.roles = [
            { value: 0, label: 'Todos' },
            ...(this.acrRole === 'admin'
                ? [{ value: EnumRole.Administrador, label: 'Administrador' }]
                : []),
            { value: EnumRole.Medico, label: 'Médico' },
            { value: EnumRole.Paciente, label: 'Paciente' }
        ];
    }

    applyRoleFilter() {
        this.getUsers(this.selectedRole); // Chame getUsers com o papel selecionado
    }

    async getUsers(params: number = 0) {
        await this.restService.get(this.endPoit, {
            roleId: params
        }).subscribe({
            next: (data: In_Users[]) => {
                this.filtered = [...data]; // Atualiza filtered com os novos dados
                this.filtered = data.map(user => {
                    let roleLabel: string;
                    switch (user.role) {
                        case EnumRole.Administrador: // Supondo que 1 seja Administrador
                            roleLabel = 'Administrador';
                            break;
                        case EnumRole.Medico: // Supondo que 2 seja Médico
                            roleLabel = 'Médico';
                            break;
                        case EnumRole.Paciente: // Supondo que 3 seja Paciente
                            roleLabel = 'Paciente';
                            break;
                        default:
                            roleLabel = 'Desconhecido'; // Ou user.role, se houver outros valores
                    }
                    return {
                        ...user,
                        role: roleLabel // Atribui a string 'Administrador', 'Médico' ou 'Paciente'
                    };
                })
            },
            error: (err) => {
                console.error('Erro ao buscar usuários:', err);
                this.snackBar.open(err.error?.message || 'Erro buscar usuário', 'OK', { duration: 4000 });
            }
        });
    }

    doctor(user: In_Users) {
        const ref = this.dialog.open(DoctorComponent, {
            width: '650px',
            data: user
        });

        ref.afterClosed().subscribe(updated => {
            // if (updated) {
            //     this.getUsers(); // recarrega a lista
            // }
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
        const data: In_ConfirmDialog = {
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