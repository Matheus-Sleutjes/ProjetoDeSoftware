import { Routes } from "@angular/router";

export const routes: Routes = [
    {
        path: '',
        title: 'user-management',
        loadComponent: async () => (await import('./user-management.component')).UserManagementComponent
    },
    {
        path: 'create',
        title: 'create',
        loadComponent: async () => (await import('./user-create/user-create.component')).UserCreateComponent
    },
    {
        path: 'edit/:id',
        title: 'edit',
        loadComponent: async () => (await import('./user-edit/user-edit.component')).UserEditComponent
    },
    {
        path: 'view/:id',
        title: 'view',
        loadComponent: async () => (await import('./user-view/user-view.component')).UserViewComponent
    },
];
