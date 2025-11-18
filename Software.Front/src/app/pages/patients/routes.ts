import { Routes } from "@angular/router";

export const routes: Routes = [
    {
        path: '',
        title: 'patients',
        loadComponent: async () => (await import('./patients.component')).PatientsComponent
    },
    {
        path: 'create',
        title: 'Novo Paciente',
        loadComponent: async () => (await import('./patient-create/patient-create.component')).PatientCreateComponent
    },
    {
        path: 'edit/:id',
        title: 'Editar Paciente',
        loadComponent: async () => (await import('./patient-edit/patient-edit.component')).PatientEditComponent
    },
    {
        path: 'view/:id',
        title: 'Visualizar Paciente',
        loadComponent: async () => (await import('./patient-view/patient-view.component')).PatientViewComponent
    }
];
