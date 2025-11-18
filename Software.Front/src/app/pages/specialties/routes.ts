import { Routes } from "@angular/router";

export const routes: Routes = [
    {
        path: '',
        title: 'specialties',
        loadComponent: async () => (await import('./specialties.component')).SpecialtiesComponent
    },
    {
        path: 'create',
        title: 'Nova Especialidade',
        loadComponent: async () => (await import('./specialty-create/specialty-create.component')).SpecialtyCreateComponent
    },
    {
        path: 'edit/:id',
        title: 'Editar Especialidade',
        loadComponent: async () => (await import('./specialty-edit/specialty-edit.component')).SpecialtyEditComponent
    },
    {
        path: 'view/:id',
        title: 'Visualizar Especialidade',
        loadComponent: async () => (await import('./specialty-view/specialty-view.component')).SpecialtyViewComponent
    }
];
