import {
  Component,
  OnInit
} from '@angular/core';

import {
  EmployeeHistory
} from '../../core/models/employee-history.model';

import {
  HistoryService
} from '../../core/services/history.service';

@Component({
  selector: 'app-history',
  standalone: false,
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent
implements OnInit {

  history: EmployeeHistory[] = [];

  filteredHistory: EmployeeHistory[] = [];

  searchTerm = '';

  loading = false;

  constructor(
    private historyService: HistoryService
  ) {}

  ngOnInit(): void {

    this.loadHistory();

  }

  loadHistory(): void {

    this.loading = true;

    this.historyService
      .getAll()
      .subscribe({

        next: (response) => {

          this.history = response;

          this.filteredHistory = response;

          this.loading = false;

        },

        error: (error) => {

          console.error(error);

          this.loading = false;

        }

      });

  }

  filterHistory(): void {

    const value =
      this.searchTerm
        .toLowerCase()
        .trim();

    this.filteredHistory =
      this.history.filter(item =>

        item.employeeName
          ?.toLowerCase()
          .includes(value)

        ||

        item.employeeLastName
          ?.toLowerCase()
          .includes(value)

        ||

        item.documentNumber
          ?.includes(value)

      );

  }

}

