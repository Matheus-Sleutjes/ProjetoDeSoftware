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
    component: RegisterComponent,
    loadChildren: async () => (await import('./pages/register/routes')).routes
  },
  {
    path: 'users', 
    component: UserManagementComponent,
    canActivate: [AuthGuard],
    loadChildren: async () => (await import('./pages/user-management/routes')).routes
  },
  {
    path: 'doctors', 
    component: DoctorsComponent,
    canActivate: [AuthGuard],
    loadChildren: async () => (await import('./pages/doctors/routes')).routes
  },
  {
    path: 'patients', 
    component: PatientsComponent,
    canActivate: [AuthGuard],
    loadChildren: async () => (await import('./pages/patients/routes')).routes
  },
  {
    path: 'appointments', 
    component: AppointmentsComponent,
    canActivate: [AuthGuard],
    loadChildren: async () => (await import('./pages/appointments/routes')).routes
  },
  {
    path: 'specialties', 
    component: SpecialtiesComponent,
    canActivate: [AuthGuard],
    loadChildren: async () => (await import('./pages/specialties/routes')).routes
  },
  {
    path: 'home', 
    component: HomeComponent, 
    canActivate: [AuthGuard],
  },
];
