import { Routes } from "@angular/router";

export const routes: Routes = [
    {
        path: '',
        title: 'payments-method',
        loadComponent: async () => (await import('./payments-method.component')).PaymentsMethodComponent
    }
];
