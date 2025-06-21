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
        path: 'update/:workshopIdentifier',
        loadComponent: () => import('./workshop-editor/workshop-editor.component').then(m => m.WorkshopEditorComponent)
    },
    {
        path: ':workshopIdentifier',
        loadComponent: () => import('./workshop-details/workshop-details.component').then(m => m.WorkshopDetailsComponent)
    },
    {
        path: ':workshopIdentifier/requirements',
        children:[
            {
                path:'',
                loadComponent: () => import('./workshop-requirements/workshop-requirements.component').then(m => m.WorkshopRequirementsComponent)
            },
            {
                path:':sessionId/grades',
                loadComponent: () => import('./workshop-requirements/workshop-requirement-grades/workshop-requirement-grades.component').then(m => m.WorkshopRequirementGradesComponent)
            },
            {
                path:':sessionId/attendance',
                loadComponent: () => import('./workshop-requirements/workshop-requirement-attendance/workshop-requirement-attendance.component').then(m => m.WorkshopRequirementAttendanceComponent)
            },
        ]
        
    },
    {
        path: ':workshopIdentifier/enrollments',
        loadComponent: () => import('./workshop-enrollments/workshop-enrollments.component').then(m => m.WorkshopEnrollmentsComponent)
    }
]

