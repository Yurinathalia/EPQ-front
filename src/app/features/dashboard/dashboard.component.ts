import { Component, OnInit } from '@angular/core';

import { Statistics } from '../../core/models/statistics.model';
import { StatisticsService } from '../../core/services/statistics.service';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  statistics: Statistics | null = null;

  loading = false;

  error = false;

  errorMessage = '';

  constructor(
    private statisticsService: StatisticsService
  ) {}

  ngOnInit(): void {

    this.loadStatistics();

  }

  loadStatistics(): void {

    this.loading = true;

    this.error = false;

    this.statisticsService
      .getDashboardStatistics()
      .subscribe({

        next: (response) => {

          this.statistics = response;

          this.loading = false;

        },

        error: (err) => {

          this.loading = false;

          this.error = true;

          this.errorMessage =
            'Error al cargar la información del panel.';

          console.error(err);

        }

      });

  }

}
