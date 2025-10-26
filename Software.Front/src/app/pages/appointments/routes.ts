import { Routes } from "@angular/router";

export const routes: Routes = [
    {
        path: '',
        title: 'appointments',
        loadComponent: async () => (await import('./appointments.component')).AppointmentsComponent
    }
];
