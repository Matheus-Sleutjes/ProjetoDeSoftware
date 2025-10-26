import { Routes } from "@angular/router";

export const routes: Routes = [
    {
        path: '',
        title: 'doctors',
        loadComponent: async () => (await import('./doctors.component')).DoctorsComponent
    }
];
