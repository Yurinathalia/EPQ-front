import { Component } from '@angular/core';

@Component({
  selector: 'app-statistics',
  standalone: false,
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent {

  /* ESTADO DE LAS ACTIVIDADES */

  activityStatusLabels = [
    'Finalizadas',
    'Programadas',
    'Canceladas'
  ];

  activityStatusData = [
    {
      data: [35, 18, 6]
    }
  ];

  /* ACTIVIDADES POR MES */

  monthlyActivitiesLabels = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre'
  ];

  monthlyActivitiesData = [
    {
      label: 'Actividades',
      data: [12, 15, 18, 22, 30, 21, 28, 17, 26, 35, 0, 0]
    }
  ];

  /* EMPLEADOS POR DEPENDENCIA */

  dependencyLabels = [
    'Talento Humano',
    'Tesorería',
    'Laboratorio',
    'Comercial',
    'Planeación',
    'Servicios'
  ];

  dependencyData = [
    {
      data: [15, 9, 12, 25, 18, 40]
    }
  ];

  /* AUSENCIAS */

  absenceLabels = [
    'Incapacidad',
    'Permiso',
    'Vacaciones',
    'Ausencia'
  ];

  absenceData = [
    {
      data: [20, 10, 16, 5]
    }
  ];

  /* DEPENDENCIAS CON MÁS ACTIVIDAD */

  activeDependencyLabels = [
    'Servicios',
    'Comercial',
    'Talento Humano',
    'Laboratorio',
    'Tesorería'
  ];

  activeDependencyData = [
    {
      label: 'Actividades',
      data: [40, 35, 22, 15, 8]
    }
  ];
  // Replace these placeholder series with monthly values from the statistics API.
  sickLeavesMonthLabels = this.monthlyActivitiesLabels;

  sickLeavesMonthData = [
    { label: 'Incapacidades', data: Array(12).fill(0) as number[] }
  ];

  vacationMonthLabels = this.monthlyActivitiesLabels;

  vacationMonthData = [
    { label: 'Vacaciones', data: Array(12).fill(0) as number[] }
  ];

}
