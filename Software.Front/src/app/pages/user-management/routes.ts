import { Routes } from "@angular/router";

export const routes: Routes = [
    {
        path: '',
        title: 'user-management',
        loadComponent: async () => (await import('./user-management.component')).UserManagementComponent
    }
];
