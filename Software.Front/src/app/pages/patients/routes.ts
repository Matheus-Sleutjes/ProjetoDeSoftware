import { Routes } from "@angular/router";

export const routes: Routes = [
    {
        path: '',
        title: 'patients',
        loadComponent: async () => (await import('./patients.component')).PatientsComponent
    }
];
