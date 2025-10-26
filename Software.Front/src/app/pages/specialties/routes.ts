import { Routes } from "@angular/router";

export const routes: Routes = [
    {
        path: '',
        title: 'specialties',
        loadComponent: async () => (await import('./specialties.component')).SpecialtiesComponent
    }
];
