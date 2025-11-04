import { Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';

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
    path: 'payments',
    canActivate: [AuthGuard],
    loadChildren: async () => (await import('./pages/payments/routes')).routes
  },
  {
    path: 'payments-method',
    canActivate: [AuthGuard],
    loadChildren: async () => (await import('./pages/payments-method/routes')).routes
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
