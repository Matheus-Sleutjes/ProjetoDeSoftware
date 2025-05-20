import { Routes } from "@angular/router";

export const routes: Routes = [
    {
        path: '',
        title: 'login',
        loadComponent: async () => (await import('./login.component')).LoginComponent
    },
    {
        path: 'new-account',
        loadComponent: () =>
            import('./new-account/new-account.component')
                .then(m => m.NewAccountComponent),
        title: 'Cadastro'
    },
];
