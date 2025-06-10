import { Routes } from "@angular/router";
export const certificatesRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./certificates.component').then(m => m.CertificatesComponent)
    },
    {
        path: 'create',
        loadComponent: () => import('./certificates-editor/certificates-editor.component').then(m => m.CertificatesEditorComponent)
    },
    {
        path: 'info',
        loadComponent: () => import('./certificates-info/certificates-info.component').then(m => m.CertificatesInfoComponent)
    },
    // {
    //     path: 'update/:id',
    //     loadComponent: () => import('./workshop-editor/workshop-editor.component').then(m => m.WorkshopEditorComponent)
    // },
    // {
    //     path: ':id',
    //     loadComponent: () => import('./workshop-details/workshop-details.component').then(m => m.WorkshopDetailsComponent)
    // }
]
