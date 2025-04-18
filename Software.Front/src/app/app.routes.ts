import { Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';
import { LoginComponent } from './pages/login/login.component';
export const routes: Routes = [
    // {
    //     path: 'patient',
    //     loadChildren: async () => (await import('./pages/patient')).routes
    // },
    { path: '', redirectTo: 'login', pathMatch:"full"},
    {
      path: 'login', component: LoginComponent
    },
    {
      path: 'user', canActivate: [AuthGuard],
      loadChildren: async () => (await import('./pages/users/routes')).routes
    }
];
