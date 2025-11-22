import { Routes } from "@angular/router";

export const routes: Routes = [
    {
        path: '',
        title: 'payments-method',
        loadComponent: async () => (await import('./payments-method.component')).PaymentsMethodComponent
    },
    {
        path: 'create',
        title: 'Novo Método de Pagamento',
        loadComponent: async () => (await import('./payment-method-create/payment-method-create.component')).PaymentMethodCreateComponent
    },
    {
        path: 'edit/:id',
        title: 'Editar Método de Pagamento',
        loadComponent: async () => (await import('./payment-method-edit/payment-method-edit.component')).PaymentMethodEditComponent
    },
    {
        path: 'view/:id',
        title: 'Visualizar Método de Pagamento',
        loadComponent: async () => (await import('./payment-method-view/payment-method-view.component')).PaymentMethodViewComponent
    }
];
