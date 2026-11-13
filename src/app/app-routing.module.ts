import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { EmployeesComponent } from './features/employees/employees.component';
import { DependenciesComponent } from './features/dependencies/dependencies.component';
import { DependencyDetailComponent } from './features/dependency-detail/dependency-detail.component';
import { ActivitiesComponent } from './features/activities/activities.component';
import { ActivityFormComponent } from './features/activity-form/activity-form.component';
import { ActivityDetailComponent } from './features/activity-detail/activity-detail.component';
import { AbsencesComponent } from './features/absences/absences.component';
import { AbsenceFormComponent } from './features/absence-form/absence-form.component';
import { HistoryComponent } from './features/history/history.component';
import { StatisticsComponent } from './features/statistics/statistics.component';
import { ReportsComponent } from './features/reports/reports.component';
import { BirthdaysComponent } from './features/birthdays/birthdays';
import { BirthdayTemplatesComponent } from './features/birthday-templates/birthday-templates';
import { BirthdayTemplateFormComponent } from './features/birthday-template-form/birthday-template-form';
import { authGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'employees', component: EmployeesComponent, canActivate: [authGuard] },
  { path: 'dependencies', component: DependenciesComponent, canActivate: [authGuard] },
  { path: 'dependency-detail/:id', component: DependencyDetailComponent, canActivate: [authGuard] },
  { path: 'activities', component: ActivitiesComponent, canActivate: [authGuard] },
  { path: 'activity-form', component: ActivityFormComponent, canActivate: [authGuard] },
  { path: 'activity-detail/:id', component: ActivityDetailComponent, canActivate: [authGuard] },
  { path: 'absences', component: AbsencesComponent, canActivate: [authGuard] },
  { path: 'absence-form', component: AbsenceFormComponent, canActivate: [authGuard] },
  { path: 'history', component: HistoryComponent, canActivate: [authGuard] },
  { path: 'statistics', component: StatisticsComponent, canActivate: [authGuard] },
  { path: 'reports', component: ReportsComponent, canActivate: [authGuard] },
  { path: 'birthdays', component: BirthdaysComponent, canActivate: [authGuard] },
  { path: 'birthday-templates', component: BirthdayTemplatesComponent, canActivate: [authGuard] },
  { path: 'birthday-template-form', component: BirthdayTemplateFormComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: 'dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
