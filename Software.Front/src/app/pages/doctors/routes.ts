import { Routes } from "@angular/router";

export const routes: Routes = [
    {
        path: '',
        title: 'doctors',
        loadComponent: async () => (await import('./doctors.component')).DoctorsComponent
    },
    {
        path: 'create',
        title: 'Novo Médico',
        loadComponent: async () => (await import('./doctor-create/doctor-create.component')).DoctorCreateComponent
    },
    {
        path: 'edit/:id',
        title: 'Editar Médico',
        loadComponent: async () => (await import('./doctor-edit/doctor-edit.component')).DoctorEditComponent
    },
    {
        path: 'view/:id',
        title: 'Visualizar Médico',
        loadComponent: async () => (await import('./doctor-view/doctor-view.component')).DoctorViewComponent
    }
];
