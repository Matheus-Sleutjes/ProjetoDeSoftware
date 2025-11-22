import { Routes } from "@angular/router";

export const routes: Routes = [
    {
        path: '',
        title: 'payments',
        loadComponent: async () => (await import('./payments.component')).PaymentsComponent
    },
    {
        path: 'create',
        title: 'Novo Pagamento',
        loadComponent: async () => (await import('./payment-create/payment-create.component')).PaymentCreateComponent
    },
    {
        path: 'edit/:id',
        title: 'Editar Pagamento',
        loadComponent: async () => (await import('./payment-edit/payment-edit.component')).PaymentEditComponent
    },
    {
        path: 'view/:id',
        title: 'Visualizar Pagamento',
        loadComponent: async () => (await import('./payment-view/payment-view.component')).PaymentViewComponent
    }
];
