import { Routes } from '@angular/router';
import { monitoringRoutes } from './pages/monitoring/monitoring.routes';
import { TransplantComponent } from './pages/transplant/transplant.component';
import { NotFoundComponent } from './pages/other-page/not-found/not-found.component';
import { AppLayoutComponent } from './shared/layout/app-layout/app-layout.component';
import { SignInComponent } from './pages/auth-pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/auth-pages/sign-up/sign-up.component';
import { ResetPasswordComponent } from './pages/auth-pages/reset-password/reset-password.component';
import { PatientsComponent } from './pages/patients/patients.component';
import { DossiersComponent } from './pages/dossiers/dossiers.component';
import { UsersListComponent } from './pages/users/users-list.component';
import { ScheduleListComponent } from './pages/report-schedule/schedule-list.component';
import { CreateScheduleComponent } from './pages/report-schedule/create-schedule.component';
import { TemplateListComponent } from './pages/report-template/template-list.component';
import { TemplateFormComponent } from './pages/report-template/template-form.component';
import { DocumentsComponent } from './pages/documents/documents.component';
import { ImagingComponent } from './pages/imaging/imaging.component';
import { LabReportsListComponent } from './pages/lab-results/lab-reports-list/lab-reports-list.component';
import { LabReportFormComponent } from './pages/lab-results/lab-report-form/lab-report-form.component';
import { LabReportDetailsComponent } from './pages/lab-results/lab-report-details/lab-report-details.component';
import { LabReportsStatisticsComponent } from './pages/lab-results/lab-reports-statistics/lab-reports-statistics.component';
import { CalendarComponent } from './pages/lab-calendar/calendar.component';

import { authGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        component: TransplantComponent,
        pathMatch: 'full',
        title: 'Transplant | Pedinephro',
      },
      {
        path: 'patients',
        component: PatientsComponent,
        title: 'Liste des Patients | Pedinephro',
      },
      {
        path: 'dossiers',
        component: DossiersComponent,
        title: 'Medical Records | Pedinephro',
      },
      {
        path: 'profile',
        loadComponent: () => import('./pages/user-profiles/user-profile.component').then(m => m.UserProfileComponent),
        title: 'Profil | Pedinephro',
      },
      {
        path: 'users',
        component: UsersListComponent,
        title: 'User Management | Pedinephro',
      },
      ...monitoringRoutes,
      // ── Report Scheduling ──────────────────────────────────────
      { path: 'schedules', component: ScheduleListComponent, title: 'Schedules | Pedinephro' },
      { path: 'schedules/create', component: CreateScheduleComponent, title: 'New Schedule | Pedinephro' },
      { path: 'schedules/edit/:id', component: CreateScheduleComponent, title: 'Edit Schedule | Pedinephro' },
      // ── Report Templates ───────────────────────────────────────
      { path: 'templates', component: TemplateListComponent, title: 'Templates | Pedinephro' },
      { path: 'templates/create', component: TemplateFormComponent, title: 'New Template | Pedinephro' },
      { path: 'templates/edit/:id', component: TemplateFormComponent, title: 'Edit Template | Pedinephro' },
      // ── Medical Media ──────────────────────────────────────────
      { path: 'documents', component: DocumentsComponent, title: 'Documents Médicaux | Pedinephro' },
      { path: 'imaging', component: ImagingComponent, title: 'Imagerie Médicale | Pedinephro' },
      // ── Lab Results ────────────────────────────────────────────
      { path: 'lab-reports', component: LabReportsListComponent, title: 'Résultats de Laboratoire | Pedinephro' },
      { path: 'lab-reports/new', component: LabReportFormComponent, title: 'Nouveau Rapport | Pedinephro' },
      { path: 'lab-reports/statistics', component: LabReportsStatisticsComponent, title: 'Statistiques Labo | Pedinephro' },
      { path: 'lab-reports/:id/edit', component: LabReportFormComponent, title: 'Modifier Rapport | Pedinephro' },
      { path: 'lab-reports/:id', component: LabReportDetailsComponent, title: 'Détail Rapport | Pedinephro' },
      { path: 'lab-calendar', component: CalendarComponent, title: 'Calendrier Médical | Pedinephro' },
    ],
  },
  // auth pages
  {
    path: 'signin',
    component: SignInComponent,
    title: 'Connexion | Pedinephro',
  },
  {
    path: 'signup',
    component: SignUpComponent,
    title: 'Inscription | Pedinephro',
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
    title: 'Reset Password | Pedinephro',
  },
  // error pages
  {
    path: '**',
    component: NotFoundComponent,
    title: 'Page non trouvée | Pedinephro',
  },
];
