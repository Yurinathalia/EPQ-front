import { Component } from '@angular/core';

@Component({
  selector: 'app-reports',
  standalone: false,
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent {

  downloadEmployeesReport(): void {

    console.log('Employees PDF');

  }

  downloadDependenciesReport(): void {

    console.log('Dependencies PDF');

  }

  downloadActivitiesReport(): void {

    console.log('Activities PDF');

  }

  downloadAbsencesReport(): void {

    console.log('Absences PDF');

  }

  downloadMonthlyReport(): void {

    console.log('Monthly PDF');

  }

}

