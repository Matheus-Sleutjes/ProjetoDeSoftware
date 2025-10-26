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
    loadChildren: async () => (await import('./pages/login/routes')).routes
  },
  {
    path: 'register',
    loadChildren: async () => (await import('./pages/register/routes')).routes
  },
  {
    path: 'users',
    canActivate: [AuthGuard],
    loadChildren: async () => (await import('./pages/user-management/routes')).routes
  },
  {
    path: 'doctors',
    canActivate: [AuthGuard],
    loadChildren: async () => (await import('./pages/doctors/routes')).routes
  },
  {
    path: 'patients',
    canActivate: [AuthGuard],
    loadChildren: async () => (await import('./pages/patients/routes')).routes
  },
  {
    path: 'appointments',
    canActivate: [AuthGuard],
    loadChildren: async () => (await import('./pages/appointments/routes')).routes
  },
  {
    path: 'specialties',
    canActivate: [AuthGuard],
    loadChildren: async () => (await import('./pages/specialties/routes')).routes
  },
  {
    path: 'home',
    canActivate: [AuthGuard],
    loadChildren: async () => (await import('./pages/home/routes')).routes
  },
];
