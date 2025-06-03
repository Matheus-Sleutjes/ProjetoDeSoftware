import { Component, Inject } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../../services/http.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { In_Users } from '../../../models/In_users';
import { In_CreateAccount } from '../../../models/In_createAccount';
import { UtilsService } from '../../../services/utils.service';
import { In_Speciality } from '../../../models/In_speciality';

@Component({
  selector: 'app-edit-user-dialog',
  imports: [SharedModule],
  templateUrl: './edit-user-dialog.component.html',
  styleUrl: './edit-user-dialog.component.scss'
})
export class EditUserDialogComponent {
  updateForm!: FormGroup;


  endpoitSpecialty = 'Specialty'

  specialty: In_Speciality[] = [];
  docterSelected: boolean = false;
  constructor(
    private fb: FormBuilder,
    private restService: HttpService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<EditUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public user: In_Users,
    private util: UtilsService
  ) { }

  ngOnInit(): void {
    this.updateForm = this.fb.group({
      name: [this.user.name],
      lastName: [this.user.lastName,],
      username: [this.user.username, [, Validators.minLength(4)]],
      email: [this.user.email, [, Validators.email]],
      password: [''],
      role: [this.user.role,],
      cpf: [
        this.util.formatCpf(this.user.cpf),
        [
          ,
          Validators.pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)
        ]
      ],
      specialty: [''],
    });

    // Atualize o valor do campo CPF ao digitar, removendo caracteres não numéricos e formatando
    this.updateForm.get('cpf')?.valueChanges.subscribe(value => {
      const numericCpf = value.replace(/\D/g, '').slice(0, 11);
      const formattedCpf = this.util.formatCpf(numericCpf);
      if (value !== formattedCpf) {
        this.updateForm.get('cpf')?.setValue(formattedCpf, { emitEvent: false });
      }
    });

    if (this.updateForm.value.role === 2) {
      this.docterSelected = true;
      this.getSpecialty();
    }
    
  }

  getRole() {
    // Aqui você pode manipular o evento de seleção de função, se necessário
    const selectedRole = this.updateForm.value.role
    console.log('Evento de seleção de função:', selectedRole);
    if (selectedRole === 2) {
      this.docterSelected = true;
      this.getSpecialty();
    }

  }

  getSpecialty() {
    this.restService.getNotController(this.endpoitSpecialty).subscribe({
      next: (data: In_Speciality[]) => {
        // Aqui você pode manipular os dados recebidos, se necessário
        console.log('Especialidades:', data);
        this.specialty = data;
      },
      error: (err) => {
        this.snackBar.open(err.error?.message || 'Erro ao carregar especialidades', 'OK', { duration: 4000 });
      }
    });
  }

  onSave(): void {
    if (this.updateForm.invalid) {
      this.updateForm.markAllAsTouched();
      return;
    }

    const payload: In_CreateAccount = {
      ...this.updateForm.value,
      cpf: this.updateForm.value.cpf.replace(/\D/g, ''), // remove formatação do CPF
      password: this.updateForm.value.password || ''  // ou mantenha sem alterar se campo vazio
    };

    this.restService
      .put(`${(this.user as any).userId}`, payload)
      .subscribe({
        next: () => {
          this.snackBar.open('Usuário atualizado com sucesso', 'OK', { duration: 3000 });
          this.dialogRef.close(true);
        },
        error: err => {
          this.snackBar.open(err.error?.message || 'Erro ao atualizar', 'OK', { duration: 4000 });
        }
      });
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
