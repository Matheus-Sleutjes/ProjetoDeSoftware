import { Routes } from "@angular/router";

export const routes: Routes = [
    {
        path: '',
        title: 'payments',
        loadComponent: async () => (await import('./payments.component')).PaymentsComponent
    }
];
