import { Component, OnInit } from '@angular/core';

import { Employee } from '../../core/models/employee.model';

import { EmployeeService } from '../../core/services/employee.service';

@Component({
  selector: 'app-employees',
  standalone: false,
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {

  employees: Employee[] = [];

  filteredEmployees: Employee[] = [];

  searchTerm = '';

  loading = false;

  searched = false;

  editingEmployee: Employee | null = null;

  saving = false;

  saveError = '';

  saveSuccess = '';

  constructor(
    private employeeService: EmployeeService
  ) { }

  ngOnInit(): void {

    this.loadEmployees();

  }

  loadEmployees(): void {

    this.loading = true;

    this.employeeService.getAll().subscribe({

      next: (response) => {

        this.employees = response;

        this.loading = false;

      },

      error: (error) => {

        console.error(error);

        this.loading = false;

      }

    });

  }

  searchEmployee(): void {

    const value =
      this.searchTerm
        .toLowerCase()
        .trim();

    if (!value) {

      this.filteredEmployees = [];

      this.searched = false;

      return;

    }

    this.searched = true;

    this.filteredEmployees =
      this.employees.filter(employee => {

        const nombreCompleto = [

          employee.fullName,

          employee.firstName,

          employee.middleName,

          employee.lastName,

          employee.secondLastName

        ]
          .filter(Boolean)
          .join(' ')
          .toLowerCase();

        return (

          nombreCompleto.includes(value)

          ||

          employee.documentNumber
            ?.toLowerCase()
            .includes(value)

          ||

          employee.jobTitle
            ?.toLowerCase()
            .includes(value)

          ||

          employee.city
            ?.toLowerCase()
            .includes(value)

          ||

          employee.phone
            ?.toLowerCase()
            .includes(value)

        );

      });

  }

  editEmployee(
    employee: Employee
  ): void {

    this.editingEmployee = {

      ...employee

    };

  }

  cancelEdit(): void {
    this.editingEmployee = null;
    this.saveError = '';
  }

  calculateAge(birthDate: string): string {

    if (!birthDate) {

      return 'No registrada';

    }

    const today = new Date();

    const birth = new Date(birthDate);

    let age =
      today.getFullYear() -
      birth.getFullYear();

    const monthDifference =
      today.getMonth() -
      birth.getMonth();

    if (
      monthDifference < 0 ||
      (
        monthDifference === 0 &&
        today.getDate() < birth.getDate()
      )
    ) {

      age--;

    }

    return age + ' años';

  }

  saveEmployee(): void {
    if (!this.editingEmployee || this.saving) {
      return;
    }

    const employeeToSave = { ...this.editingEmployee };
    this.saving = true;
    this.saveError = '';
    this.saveSuccess = '';

    this.employeeService.update(employeeToSave.id, employeeToSave).subscribe({
      next: (updatedEmployee) => {
        this.employees = this.employees.map(employee =>
          employee.id === updatedEmployee.id ? updatedEmployee : employee
        );
        this.saveSuccess = 'Empleado actualizado correctamente.';
        this.editingEmployee = null;
        this.saving = false;

        if (this.searched) {
          this.searchEmployee();
        }
      },
      error: (error: unknown) => {
        console.error('No se pudo actualizar el empleado.', error);
        this.saveError = 'No se pudieron guardar los cambios. Inténtalo de nuevo.';
        this.saving = false;
      }
    });
  }

}
