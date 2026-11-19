import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, forkJoin, map, of } from 'rxjs';

export type NotificationKind = 'ABSENCE' | 'ACTIVITY' | 'BIRTHDAY';

export interface AppNotification {
  id: string;
  kind: NotificationKind;
  title: string;
  detail: string;
  date: string;
  icon: string;
  href?: string;
}

/**
 * Construye las notificaciones de la campanita a partir de TRES fuentes reales:
 *   - ausencias registradas  -> /api/employee-absences
 *   - actividades creadas    -> /api/activities
 *   - cumpleaños del mes     -> /api/birthdays/month/{mes}
 *
 * Son las rutas que el backend expone realmente (los servicios viejos del
 * front apuntan a /api/v1/... que no existen y dan 404).
 */
@Injectable({ providedIn: 'root' })
export class NotificationService {

  private readonly base = 'http://localhost:8080';

  constructor(private readonly http: HttpClient) {}

  cargar(): Observable<AppNotification[]> {
    const mes = new Date().getMonth() + 1;

    return forkJoin({
      ausencias: this.http
        .get<any[]>(`${this.base}/api/employee-absences`)
        .pipe(catchError(() => of([]))),
      actividades: this.http
        .get<any[]>(`${this.base}/api/activities`)
        .pipe(catchError(() => of([]))),
      cumpleanos: this.http
        .get<any[]>(`${this.base}/api/birthdays/month/${mes}`)
        .pipe(catchError(() => of([])))
    }).pipe(
      map(({ ausencias, actividades, cumpleanos }) =>
        [
          ...this.mapAusencias(ausencias),
          ...this.mapActividades(actividades),
          ...this.mapCumpleanos(cumpleanos)
        ]
          .sort((a, b) => b.date.localeCompare(a.date))
          .slice(0, 10)
      )
    );
  }

  private mapAusencias(items: any[]): AppNotification[] {
    return (items ?? [])
      .filter((a) => a && a.id != null)
      .sort((a, b) =>
        String(b.registeredAt ?? b.startDate ?? '')
          .localeCompare(String(a.registeredAt ?? a.startDate ?? ''))
      )
      .slice(0, 3)
      .map((a) => ({
        id: `absence-${a.id}`,
        kind: 'ABSENCE' as const,
        title: `Ausencia: ${this.tipoAusencia(a.absenceType)}`,
        detail: `Empleado #${a.employeeId} · ${a.status ?? 'REPORTED'}`,
        date: this.fecha(a.registeredAt ?? a.startDate),
        icon: '📋',
        href: '/absences'
      }));
  }

  private mapActividades(items: any[]): AppNotification[] {
    return (items ?? [])
      .filter((a) => a && a.id != null)
      .sort((a, b) =>
        String(b.createdAt ?? b.startAt ?? '')
          .localeCompare(String(a.createdAt ?? a.startAt ?? ''))
      )
      .slice(0, 3)
      .map((a) => ({
        id: `activity-${a.id}`,
        kind: 'ACTIVITY' as const,
        title: `Actividad: ${a.title ?? 'Sin título'}`,
        detail: [a.location, a.status].filter(Boolean).join(' · '),
        date: this.fecha(a.createdAt ?? a.startAt),
        icon: '📅',
        href: '/activities'
      }));
  }

  private mapCumpleanos(items: any[]): AppNotification[] {
    return (items ?? []).slice(0, 3).map((c, i) => {
      const nombre =
        c.full_name ?? `${c.first_name ?? ''} ${c.last_name ?? ''}`.trim();
      return {
        id: `birthday-${c.id ?? c.document_number ?? i}`,
        kind: 'BIRTHDAY' as const,
        title: `Cumpleaños de ${nombre || 'empleado'}`,
        detail: c.dependency_name
          ? `Dependencia: ${c.dependency_name}`
          : 'Cumpleaños de este mes',
        date: this.fecha(c.birth_date),
        icon: '🎂',
        href: '/birthdays'
      };
    });
  }

  private tipoAusencia(tipo: string | undefined): string {
    const nombres: Record<string, string> = {
      ABSENCE: 'Ausencia',
      PERMISSION: 'Permiso',
      SICK_LEAVE: 'Incapacidad',
      VACATION: 'Vacación',
      LICENSE: 'Licencia',
      COMMISSION: 'Comisión',
      OTHER: 'Otro'
    };
    return nombres[tipo ?? ''] ?? tipo ?? 'Sin tipo';
  }

  /** Acepta ISO string, epoch (number) o valores nulos sin explotar. */
  private fecha(valor: unknown): string {
    if (valor == null || valor === '') return new Date(0).toISOString();
    if (typeof valor === 'number') return new Date(valor).toISOString();

    const texto = String(valor);
    const fecha = new Date(texto);
    return isNaN(fecha.getTime()) ? new Date(0).toISOString() : fecha.toISOString();
  }
}
