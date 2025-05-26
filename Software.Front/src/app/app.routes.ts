import { Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { AppointmentsComponent } from './pages/appointments/appointments.component';
import { NewAccountComponent } from './pages/login/new-account/new-account.component';
import { ListUserComponent } from './pages/users/list-user/list-user.component';
export const routes: Routes = [
  // {
  //     path: 'patient',
  //     loadChildren: async () => (await import('./pages/patient')).routes
  // },
  { path: '', redirectTo: 'login', pathMatch: "full" },
  {
    path: 'login', component: LoginComponent,
    loadChildren: async () => (await import('./pages/login/routes')).routes
  },
  {
    path: 'new-account', component: NewAccountComponent,
    loadChildren: async () => (await import('./pages/login/routes')).routes
  },
  {
    path: 'user', canActivate: [AuthGuard],
    loadChildren: async () => (await import('./pages/users/routes')).routes
  },
  {
    path: 'appointments', canActivate: [AuthGuard],
    loadChildren: async () => (await import('./pages/appointments/routes')).routes
  },
  
  // {
  //   path: 'home', component: HomeComponent, canActivate: [AuthGuard],
  // }
  {
    path: 'home', component: HomeComponent,
  },
  {
    path: 'list-user', component: ListUserComponent,
  },
];
