import { Routes } from "@angular/router";

export const routes: Routes = [
    {
        path: '',
        title: 'home',
        loadComponent: async () => (await import('./home.component')).HomeComponent
    }
];
