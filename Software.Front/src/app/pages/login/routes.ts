import { Routes } from "@angular/router";

export const routes: Routes = [
    {
        path: '',
        title: 'login',
        loadComponent: async () => (await import('./login.component')).LoginComponent
    }
];
