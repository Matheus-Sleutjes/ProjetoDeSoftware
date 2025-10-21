import { Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { UserManagementComponent } from './pages/user-management/user-management.component';
import { DoctorsComponent } from './pages/doctors/doctors.component';
import { PatientsComponent } from './pages/patients/patients.component';
import { AppointmentsComponent } from './pages/appointments/appointments.component';
import { SpecialtiesComponent } from './pages/specialties/specialties.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: "full" },
  {
    path: 'login', 
    component: LoginComponent,
    loadChildren: async () => (await import('./pages/login/routes')).routes
  },
  {
    path: 'register', 
    component: RegisterComponent
  },
  {
    path: 'home', 
    component: HomeComponent, 
    canActivate: [AuthGuard],
  },
  {
    path: 'users', 
    component: UserManagementComponent, 
    canActivate: [AuthGuard],
  },
  {
    path: 'doctors', 
    component: DoctorsComponent, 
    canActivate: [AuthGuard],
  },
  {
    path: 'patients', 
    component: PatientsComponent, 
    canActivate: [AuthGuard],
  },
  {
    path: 'appointments', 
    component: AppointmentsComponent, 
    canActivate: [AuthGuard],
  },
  {
    path: 'specialties', 
    component: SpecialtiesComponent, 
    canActivate: [AuthGuard],
  },
];
