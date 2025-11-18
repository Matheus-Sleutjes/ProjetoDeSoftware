import { Routes } from "@angular/router";

export const routes: Routes = [
    {
        path: '',
        title: 'appointments',
        loadComponent: async () => (await import('./appointments.component')).AppointmentsComponent
    },
    {
        path: 'create',
        title: 'Novo Agendamento',
        loadComponent: async () => (await import('./appointment-create/appointment-create.component')).AppointmentCreateComponent
    },
    {
        path: 'edit/:id',
        title: 'Editar Agendamento',
        loadComponent: async () => (await import('./appointment-edit/appointment-edit.component')).AppointmentEditComponent
    },
    {
        path: 'view/:id',
        title: 'Visualizar Agendamento',
        loadComponent: async () => (await import('./appointment-view/appointment-view.component')).AppointmentViewComponent
    }
];
