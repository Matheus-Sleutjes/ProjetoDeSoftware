import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppointmentService } from './services/appointment.service';
import { PatientService } from './services/patient.service';
import { DoctorService } from './services/doctor.service';
import { SpecialtyService } from './services/specialty.service';
import { AuthenticationService } from './services/authentication.service';
import { ToastService } from './services/toast.service';
import { UtilsService } from './services/utils.service';
import { HttpService } from './services/http.service';
import { SharedModule } from './shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule
  ],
  providers: [
    AppointmentService,
    PatientService,
    DoctorService,
    SpecialtyService,
    AuthenticationService,
    ToastService,
    UtilsService,
    HttpService
  ]
})
export class AppModule { }
