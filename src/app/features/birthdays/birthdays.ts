import {
  Component,
  OnInit
} from '@angular/core';

import {
  Birthday
} from '../../core/models/birthday.model';

import {
  BirthdayService
} from '../../core/services/birthday.service';

@Component({
  selector: 'app-birthdays',
  standalone: false,
  templateUrl: './birthdays.html',
  styleUrls: ['./birthdays.scss']
})
export class BirthdaysComponent
implements OnInit {

  birthdays: Birthday[] = [];

  filteredBirthdays: Birthday[] = [];

  loading = false;

  searchTerm = '';

  constructor(
    private birthdayService: BirthdayService
  ) {}

  ngOnInit(): void {

    this.loadBirthdays();

  }

  loadBirthdays(): void {

    this.loading = true;

    this.birthdayService
      .getBirthdays()
      .subscribe({

        next: (response) => {

          this.birthdays = response;

          this.filteredBirthdays = response;

          this.loading = false;

        },

        error: (error) => {

          console.error(error);

          this.loading = false;

        }

      });

  }

  filterBirthdays(): void {

    const value =
      this.searchTerm
        .toLowerCase()
        .trim();

    this.filteredBirthdays =
      this.birthdays.filter(employee =>

        employee.firstName
          ?.toLowerCase()
          .includes(value)

        ||

        employee.lastName
          ?.toLowerCase()
          .includes(value)

        ||

        employee.documentNumber
          ?.includes(value)

      );

  }

  sendGreeting(
    birthday: Birthday
  ): void {

    console.log(
      'Send greeting',
      birthday.employeeId
    );

  }

}

