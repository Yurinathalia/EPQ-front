import { Component, OnInit } from '@angular/core';

import { Activity } from '../../core/models/activity.model';
import { ActivityService } from '../../core/services/activity.service';

@Component({
  selector: 'app-activities',
  standalone: false,
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss']
})
export class ActivitiesComponent implements OnInit {

  activities: Activity[] = [];

  filteredActivities: Activity[] = [];

  loading = false;

  searchTerm = '';

  constructor(
    private activityService: ActivityService
  ) {}

  ngOnInit(): void {
    this.loadActivities();
  }

  loadActivities(): void {

    this.loading = true;

    this.activityService
      .getAll()
      .subscribe({

        next: (response) => {

          this.activities = response;

          this.filteredActivities = response;

          this.loading = false;

        },

        error: (error) => {

          console.error(error);

          this.loading = false;

        }

      });

  }

  filterActivities(): void {

    const value = this.searchTerm
      .toLowerCase()
      .trim();

    this.filteredActivities =
      this.activities.filter(activity =>

        activity.title
          ?.toLowerCase()
          .includes(value)

      );

  }

  getActivityTypeLabel(type: string | null | undefined): string {
    const labels: Record<string, string> = {
      TRAINING: 'Capacitación',
      CAPACITATION: 'Capacitación',
      CAPACITACION: 'Capacitación',
      CAPACITACIÓN: 'Capacitación',
      MEETING: 'Reunión',
      REUNION: 'Reunión',
      REUNIÓN: 'Reunión',
      EVENT: 'Evento',
      CAMPAIGN: 'Campaña',
      CAMPANA: 'Campaña',
      WORKDAY: 'Jornada',
      JORNADA: 'Jornada',
      ABSENCE: 'Ausencia',
      VACATION: 'Vacaciones',
      PERMISSION: 'Permiso',
      OTHER: 'Otro'
    };

    const key = type?.trim().toUpperCase().replace(/[\s-]+/g, '_') ?? '';
    return labels[key] ?? 'Otro';
  }

  getStatusLabel(status: string | null | undefined): string {
    const labels: Record<string, string> = {
      COMPLETED: 'Finalizada',
      COMPLETE: 'Finalizada',
      FINALIZADA: 'Finalizada',
      FINALIZADO: 'Finalizada',
      PLANNED: 'Programada',
      SCHEDULED: 'Programada',
      PROGRAMADA: 'Programada',
      PROGRAMADO: 'Programada',
      CANCELLED: 'Cancelada',
      CANCELED: 'Cancelada',
      CANCELADA: 'Cancelada',
      CANCELADO: 'Cancelada',
      PENDING: 'Pendiente',
      PENDIENTE: 'Pendiente',
      APPROVED: 'Aprobada',
      APROBADA: 'Aprobada',
      APROBADO: 'Aprobada',
      REJECTED: 'Rechazada',
      RECHAZADA: 'Rechazada',
      RECHAZADO: 'Rechazada',
      ACTIVE: 'Activa',
      ACTIVA: 'Activa',
      ACTIVO: 'Activo',
      INACTIVE: 'Inactiva',
      INACTIVA: 'Inactiva',
      INACTIVO: 'Inactivo',
      IN_PROGRESS: 'En curso',
      ONGOING: 'En curso',
      EN_CURSO: 'En curso',
      ON_HOLD: 'En espera',
      POSTPONED: 'Aplazada',
      IN_REVIEW: 'En revisión',
      NOT_STARTED: 'Sin iniciar',
      SENT: 'Enviada',
      SIN_ESPECIFICAR: 'Sin especificar'
    };

    const key = status?.trim().toUpperCase().replace(/[\s-]+/g, '_') ?? '';
    return labels[key] ?? 'Sin especificar';
  }

}
