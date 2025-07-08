import { Component, Inject, OnInit } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { FormBuilder, FormGroup } from '@angular/forms';
import { In_Speciality } from '../../../models/In_speciality';
import { HttpService } from '../../../services/http.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EditUserDialogComponent } from '../edit-user-dialog/edit-user-dialog.component';
import { In_Users } from '../../../models/In_users';
import { UtilsService } from '../../../services/utils.service';
import { In_Doctor } from '../../../models/In_doctor';

@Component({
  selector: 'app-doctor',
  imports: [SharedModule],
  templateUrl: './doctor.component.html',
  styleUrl: './doctor.component.scss'
})
export class DoctorComponent implements OnInit {
  doctorForm!: FormGroup;
  specialty: In_Speciality[] = [];
  docterSelected: boolean = false;

  endpoitSpecialty = 'Specialty';
  endpointDocktor = 'Doctor';

  constructor(
    private fb: FormBuilder,
    private restService: HttpService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<EditUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public user: In_Users,
    private util: UtilsService
  ) {

  }

  ngOnInit(): void {
    this.doctorForm = this.fb.group({
      specialty: [''],
      crm: [''],
    });

    this.getSpecialty();
  }

  onSave() {
    let params: In_Doctor = {
      doctorId: 0, // Assuming doctorId is auto-generated
      userId: this.user.userId,
      specialtyId: this.doctorForm.get('specialty')?.value,
      crm: this.doctorForm.get('crm')?.value,
    }
    this.restService.post(this.endpointDocktor, params).subscribe((data) => {
      this.snackBar.open('Médico cadastrado com sucesso!', 'OK', { duration: 4000 });
      this.dialogRef.close(true); // Fecha o diálogo e retorna true para indicar sucesso
    }, catchError => {
      this.snackBar.open(catchError.error?.message || 'Erro ao cadastrar médico', 'OK', { duration: 4000 });
      this.dialogRef.close(false); // Fecha o diálogo e retorna false para indicar erro
    })
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

  getDoctorSpecialty() {
    
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
