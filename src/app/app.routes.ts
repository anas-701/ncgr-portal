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
      { path: 'training-services', component: TrainingProgramsComponent },
      {
        path: 'createTrainingServices',
        component: CreateTrainingServicesComponent,
      },
      { path: 'training-content', component: TrainingContentComponent },
      { path: 'training-paths', component: TrainingTrackComponent },
      { path: 'training-paths/:id', component: TrainingTrakeDetailsComponent },
      { path: 'my-profile', component: MyProfileComponent },
      { path: 'login', component: LoginComponent },

    ],
  },
  { path: '**', component: NotFoundComponent },
];
