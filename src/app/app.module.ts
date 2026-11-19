import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { FormsModule } from '@angular/forms';
import { provideClientHydration } from '@angular/platform-browser';
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { AbsencesComponent } from './features/absences/absences.component';
import { AbsenceFormComponent } from './features/absence-form/absence-form.component';
import { ActivitiesComponent } from './features/activities/activities.component';
import { ActivityDetailComponent } from './features/activity-detail/activity-detail.component';
import { ActivityFormComponent } from './features/activity-form/activity-form.component';
import { LoginComponent } from './features/auth/login/login.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { DependenciesComponent } from './features/dependencies/dependencies.component';
import { DependencyDetailComponent } from './features/dependency-detail/dependency-detail.component';
import { EmployeesComponent } from './features/employees/employees.component';
import { HistoryComponent } from './features/history/history.component';
import { NavbarComponent } from './features/layout/navbar/navbar.component';
import { NotificationBellComponent } from './features/layout/notification-bell/notification-bell.component';
import { ReportsComponent } from './features/reports/reports.component';
import { StatisticsComponent } from './features/statistics/statistics.component';
import { ModalComponent } from './shared/components/modal/modal.component';
import { SearchBoxComponent } from './shared/components/search-box/search-box.component';
import { StatisticCardComponent } from './shared/components/statistic-card/statistic-card.component';
import { TableComponent } from './shared/components/table/table.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BirthdaysComponent } from './features/birthdays/birthdays';
import { BirthdayTemplatesComponent } from './features/birthday-templates/birthday-templates';
import { BirthdayTemplateFormComponent } from './features/birthday-template-form/birthday-template-form';
import { NotificationsComponent } from './features/notifications/notifications.component.ts/notifications.component.ts';

@NgModule({
  declarations: [
    AppComponent,
    AbsencesComponent,
    AbsenceFormComponent,
    ActivitiesComponent,
    ActivityDetailComponent,
    ActivityFormComponent,
    LoginComponent,
    DashboardComponent,
    DependenciesComponent,
    DependencyDetailComponent,
    EmployeesComponent,
    HistoryComponent,
    NavbarComponent,
    NotificationBellComponent,
    ReportsComponent,
    StatisticsComponent,
    ModalComponent,
    SearchBoxComponent,
    StatisticCardComponent,
    TableComponent,
    BirthdaysComponent,
    BirthdayTemplatesComponent,
    BirthdayTemplateFormComponent,
    NotificationsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BaseChartDirective
  ],
  providers: [
    provideHttpClient(withFetch(), withInterceptors([authInterceptor])),
    provideClientHydration(),
    provideCharts(withDefaultRegisterables())
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}




