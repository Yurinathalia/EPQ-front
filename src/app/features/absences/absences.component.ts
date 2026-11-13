import { Component, OnInit } from '@angular/core';

import {
  EmployeeAbsence
} from '../../core/models/employee-absence.model';

import {
  AbsenceService
} from '../../core/services/absence.service';

@Component({
  selector: 'app-absences',
  standalone: false,
  templateUrl: './absences.component.html',
  styleUrls: ['./absences.component.scss']
})
export class AbsencesComponent implements OnInit {

  absences: EmployeeAbsence[] = [];

  filteredAbsences: EmployeeAbsence[] = [];

  searchTerm = '';

  selectedType = 'ALL';

  loading = false;

  constructor(
    private absenceService: AbsenceService
  ) { }

  ngOnInit(): void {

    this.loadAbsences();

  }

  loadAbsences(): void {

    this.loading = true;

    this.absenceService
      .getAll()
      .subscribe({

        next: (response) => {

          this.absences = response;

          this.filteredAbsences = response;

          this.loading = false;

        },

        error: (error) => {

          console.error(error);

          this.loading = false;

        }

      });

  }

  filterAbsences(): void {

    const searchValue =
      this.searchTerm
        .toLowerCase()
        .trim();

    this.filteredAbsences =
      this.absences.filter(absence => {

        const matchesEmployee =

          absence.employeeName
            ?.toLowerCase()
            .includes(searchValue)

          ||

          absence.employeeLastName
            ?.toLowerCase()
            .includes(searchValue)

          ||

          absence.documentNumber
            ?.toString()
            .includes(searchValue);

        const matchesType =

          this.selectedType === 'ALL'

          ||

          absence.absenceType === this.selectedType;

        return matchesEmployee && matchesType;

      });

  }

  getAbsenceTypeLabel(type: string | null | undefined): string {
    const labels: Record<string, string> = {
      SICK_LEAVE: 'Incapacidad',
      SICK: 'Incapacidad',
      INCAPACIDAD: 'Incapacidad',
      INCAPACITACIÓN: 'Incapacidad',
      VACATION: 'Vacaciones',
      VACACIONES: 'Vacaciones',
      PERMISSION: 'Permiso',
      PERMISO: 'Permiso',
      ABSENCE: 'Ausencia',
      AUSENCIA: 'Ausencia',
      OTHER: 'Otro',
      OTRO: 'Otro'
    };

    const key = type?.trim().toUpperCase().replace(/[\s-]+/g, '_') ?? '';
    return labels[key] ?? 'Otro';
  }

  getStatusLabel(status: string | null | undefined): string {
    const labels: Record<string, string> = {
      PENDING: 'Pendiente',
      PENDIENTE: 'Pendiente',
      APPROVED: 'Aprobada',
      APROBADA: 'Aprobada',
      APROBADO: 'Aprobada',
      REJECTED: 'Rechazada',
      RECHAZADA: 'Rechazada',
      RECHAZADO: 'Rechazada',
      COMPLETED: 'Finalizada',
      FINALIZADA: 'Finalizada',
      FINALIZADO: 'Finalizado',
      ACTIVE: 'Activa',
      INACTIVE: 'Inactiva',
      IN_PROGRESS: 'En curso',
      EN_CURSO: 'En curso',
      IN_REVIEW: 'En revisión',
      SENT: 'Enviada',
      CANCELLED: 'Cancelada',
      CANCELED: 'Cancelada',
      CANCELADA: 'Cancelada',
      CANCELADO: 'Cancelado',
      INACTIVA: 'Inactiva',
      INACTIVO: 'Inactivo',
      ACTIVA: 'Activa',
      ACTIVO: 'Activo',
      SIN_ESPECIFICAR: 'Sin especificar'
    };

    const key = status?.trim().toUpperCase().replace(/[\s-]+/g, '_') ?? '';
    return labels[key] ?? 'Sin especificar';
  }

}
