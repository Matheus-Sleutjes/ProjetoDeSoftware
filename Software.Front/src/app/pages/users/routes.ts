import { Routes } from "@angular/router";

export const routes: Routes = [
    {
        path: '',
        title: 'Users',
        loadComponent: async () => (await import('./list-user/list-user.component')).ListUserComponent
    },
    {
        path: 'new-user',
        title: 'New User',
        loadComponent: async () => (await import('./new-user/new-user.component')).NewUserComponent
    },
];
