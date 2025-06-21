import { Routes } from '@angular/router';

import { HomepageComponent } from './pages/homepage/homepage.component';
import { AboutAcademyComponent } from './pages/about-academy/about-academy.component';
import { TrainingProgramsComponent } from './pages/training-programs/training-programs.component';
import { CreateTrainingServicesComponent } from './pages/create-training-services/create-training-services.component';
import { DashboardComponent } from './layout/dashboard-layout/compnents/pages/pages/dashboard/dashboard.component';
import { FormsComponent } from './layout/dashboard-layout/compnents/pages/pages/forms/forms.component';
import { HelpComponent } from './layout/dashboard-layout/compnents/pages/pages/help/help.component';
import { ProfileComponent } from './layout/dashboard-layout/compnents/pages/pages/profile/profile.component';
import { SettingsComponent } from './layout/dashboard-layout/compnents/pages/pages/settings/settings.component';
import { DashboardLayoutComponent } from './layout/dashboard-layout/dashboard-layout.component';
import { AddTrainingProgramComponent } from './pages/add-training-program/add-training-program.component';
import { TrainingProgramDetailsComponent } from './pages/training-program-details/training-program-details.component';
import { TrainingContentComponent } from './pages/training-content/training-content.component';
import { TrainingTrakeDetailsComponent } from './pages/training-track/training-trake-details/training-trake-details.component';
import { MyProfileComponent } from './pages/my-profile/my-profile.component';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { TrainingTrackComponent } from './pages/training-track/training-track.component';
import { AddGeneralProgramsComponent } from './pages/generalPrograms/add-general-programs/add-general-programs.component';
import { GeneralProgramsDashboardComponent } from './pages/generalPrograms/dashboard/dashboard.component';
import { TraineeComponent } from './pages/generalPrograms/pages/trainee/trainee.component';
import { ReportsComponent } from './pages/reports.component/reports.component';
import { TagCreateComponent } from './pages/tags/tag-create.component/tag-create.component';
import { TagDetailsComponent } from './pages/tags/tag-details.component/tag-details.component';
import { UsersComponent } from './pages/users.component/users.component';
import { AdminComponent } from './pages/generalPrograms/pages/admin/admin.component';
import { GuestComponent } from './pages/generalPrograms/pages/guest/guest.component';
import { InfoComponent } from './pages/generalPrograms/pages/info/info.component';
import { ContentComponent } from './pages/generalPrograms/pages/content/content.component';
import { EnrollmentsComponent } from './pages/generalPrograms/pages/enrollments.component/enrollments.component';
import { WorkshopsComponent } from './pages/workshops/workshops.component';

import { ChangeRoleComponent } from './pages/change-role/change-role.component';
import { NotAuthorizeComponent } from './pages/not-authorize/not-authorize.component';
import { ControlPanelComponent } from './pages/control-panel/control-panel.component';
import { AuthGuard } from './@core/guards/auth.guard';
import { Role } from './@core/enums/role.enum';
import { AdminAboutContentComponentComponent } from './pages/admin-about-content-component/admin-about-content-component.component';
import { EvaluationListComponent } from './features/evaluation/pages/evaluation-list/evaluation-list.component';

// export const routes: Routes = [
//   {
//     path: '',
//     component: DashboardLayoutComponent,
//     children: [
//       { path: '', redirectTo: 'home', pathMatch: 'full' },
//       { path: 'home', component: HomepageComponent },
//       { path: 'dashboard', component: DashboardComponent },
//       { path: 'add-training-program', component: AddTrainingProgramComponent },
//       { path: 'dashboard/:id', component: TrainingProgramDetailsComponent },
//       {
//         path: 'dashboard/:id/:title',
//         component: TrainingProgramDetailsComponent,
//       },
//       { path: 'forms', component: FormsComponent },
//       { path: 'profile', component: ProfileComponent },
//       { path: 'settings', component: SettingsComponent },
//       { path: 'help', component: HelpComponent },
//       { path: 'aboutacademy', component: AboutAcademyComponent },
//       { path: 'training-services', component: TrainingProgramsComponent },

//       {
//         path: 'createTrainingServices',
//         component: CreateTrainingServicesComponent,
//       },

//       // {
//       //   path: 'training-program-details',
//       //   component: TrainingProgramDetailsComponent,
//       // },
//       { path: 'training-content', component: TrainingContentComponent },

//       { path: 'training-paths', component: TrainingTrackComponent },
//       { path: 'training-paths/:id', component: TrainingTrakeDetailsComponent },
//       { path: 'my-profile', component: MyProfileComponent },
//       { path: 'login', component: LoginComponent },
//       { path: '404', component: NotFoundComponent },
//     ],
//   },
//   { path: '**', redirectTo: 'home', pathMatch: 'full' },
// ];

export const routes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomepageComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'add-training-program', component: AddTrainingProgramComponent },
      { path: 'dashboard/:id', component: TrainingProgramDetailsComponent },
      {
        path: 'dashboard/:id/:title',
        component: TrainingProgramDetailsComponent,
      },
      { path: 'forms', component: FormsComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'help', component: HelpComponent },
      { path: 'aboutacademy', component: AboutAcademyComponent },
      { path: 'admin/aboutAcademy', component: AdminAboutContentComponentComponent },
      { path: 'training-services', component: TrainingProgramsComponent },
      {
        path: 'createTrainingServices',
        component: CreateTrainingServicesComponent,
      },
      { path: 'training-content', component: TrainingContentComponent },
      { path: 'training-paths', component: TrainingTrackComponent },
      { path: 'training-paths/:id', component: TrainingTrakeDetailsComponent },
      { path: 'my-profile', component: MyProfileComponent },
      { path: 'add-general-program', component: AddGeneralProgramsComponent },
      { path: 'generalPrograms', component: GeneralProgramsDashboardComponent },
      { path: 'trainee/generalPrograms', component: TraineeComponent },
      { path: 'admin/generalPrograms', component: AdminComponent },
      { path: 'guest/generalPrograms', component: GuestComponent },
      { path: 'tags', component: TagCreateComponent },
      { path: 'tag-details', component: TagDetailsComponent },
      { path: 'reports', component: ReportsComponent },
      { path: 'users', component: UsersComponent },
      { path: 'generalPrograms/info', component: InfoComponent },
      { path: 'generalPrograms/content', component: ContentComponent },
      { path: 'generalPrograms/trainees', component: EnrollmentsComponent },


      { 
        path: 'login/:returnUrl?', 
        component: LoginComponent 
      },
      { 
        path: 'login', 
        component: LoginComponent 
      },
      { 
        path: 'change-role', 
        component: ChangeRoleComponent,
        canActivate: [AuthGuard],
        // data: {
        //   expectedRoles: [Role.Admin, Role.EducationalContentCreator,]
        // }
      },
      { 
        path: 'change-role/:returnUrl?', 
        component: ChangeRoleComponent,
        canActivate: [AuthGuard]
      },
      { 
        path: 'control-panel', 
        component: ControlPanelComponent,
        canActivate: [  ]
      },
      {
        path: "",
        loadChildren: () => import("./features/evaluation/evaluation.routes"),
      },
      // { 
      //   path: 'evaluations', 
      //   component: EvaluationListComponent,
      //   canActivate: [AuthGuard]
      // },
      { 
        path: 'not-authorize', 
        component: NotAuthorizeComponent
      },
      { path: 'workshops', 
        loadChildren: () => import('./pages/workshops/workshops.routes').then(m => m.workshopsRoutes)
       },
      { path: 'certificates', 
        loadChildren: () => import('./pages/certificates/certificates.routes').then(m => m.certificatesRoutes)
       },

    ],
  },
  { path: '**', component: NotFoundComponent },
];
