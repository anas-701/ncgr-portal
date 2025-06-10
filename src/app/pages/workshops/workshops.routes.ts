import { Routes } from "@angular/router";
export const workshopsRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./workshops.component').then(m => m.WorkshopsComponent)
    },
    {
        path: 'create',
        loadComponent: () => import('./workshop-editor/workshop-editor.component').then(m => m.WorkshopEditorComponent)
    },
    {
        path: 'update/:id',
        loadComponent: () => import('./workshop-editor/workshop-editor.component').then(m => m.WorkshopEditorComponent)
    },
    {
        path: ':id',
        loadComponent: () => import('./workshop-details/workshop-details.component').then(m => m.WorkshopDetailsComponent)
    },
    {
        path: ':id/requirements',
        loadComponent: () => import('./workshop-requirements/workshop-requirements.component').then(m => m.WorkshopRequirementsComponent)
    }
]

