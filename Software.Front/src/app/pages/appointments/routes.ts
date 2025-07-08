import { Routes } from "@angular/router";

export const routes: Routes = [
    {
        path: '',
        title: 'Agendamentos',
        loadComponent: async () => (await import('./appointments.component')).AppointmentsComponent
    },
    {
        path: 'new-appointment',
        title: 'Novo Agendamento',
        loadComponent: async () => (await import('./new-appointment/new-appointment.component')).NewAppointmentComponent
    },
    {
        path: 'appointment-list',
        title: 'Lista Agendamento',
        loadComponent: async () => (await import('./appointment-list/appointment-list.component')).AppointmentListComponent
    },
    {
        path: 'appointment-form',
        title: 'Formulario Agendamento',
        loadComponent: async () => (await import('./appointment-form/appointment-form.component')).AppointmentFormComponent
    },
];
