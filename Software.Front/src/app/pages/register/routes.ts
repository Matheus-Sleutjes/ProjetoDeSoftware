import { Routes } from "@angular/router";

export const routes: Routes = [
    {
        path: '',
        title: 'register',
        loadComponent: async () => (await import('./register.component')).RegisterComponent
    }
];
