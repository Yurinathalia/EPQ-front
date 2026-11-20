import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { Employee } from '../../core/models/employee.model';

import { EmployeeService } from '../../core/services/employee.service';

@Component({
  selector: 'app-employees',
  standalone: false,
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit, OnDestroy {

  employees: Employee[] = [];

  filteredEmployees: Employee[] = [];

  searchTerm = '';

  loading = false;

  searched = false;

  editingEmployee: Employee | null = null;

  saving = false;

  saveError = '';

  saveSuccess = '';

  private saveSuccessTimeout: ReturnType<typeof setTimeout> | null = null;

  constructor(
    private employeeService: EmployeeService
  ) { }

  ngOnInit(): void {

    this.loadEmployees();

  }

  ngOnDestroy(): void {
    this.clearSaveSuccessTimeout();
  }

  private showSaveSuccess(message: string): void {
    this.clearSaveSuccessTimeout();
    this.saveSuccess = message;
    this.saveSuccessTimeout = setTimeout(() => {
      this.saveSuccess = '';
      this.saveSuccessTimeout = null;
    }, 10000);
  }

  private clearSaveSuccessTimeout(): void {
    if (this.saveSuccessTimeout !== null) {
      clearTimeout(this.saveSuccessTimeout);
      this.saveSuccessTimeout = null;
    }
  }

  loadEmployees(): void {

    this.loading = true;

    this.employeeService.getAll().subscribe({

      next: (response) => {

        this.employees = response;
        this.actionError = '';

        this.loading = false;

        if (this.searched) {
          this.searchEmployee();
        }

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

  editEmployee(employee: Employee): void {

    const nombreCompleto =

      employee.fullName ||

      [

        employee.firstName,

        employee.middleName,

        employee.lastName,

        employee.secondLastName

      ]

        .filter(value =>
          value &&
          value.trim() !== ''
        )
        .join(' ');

    this.editingEmployee = {

      ...employee,

      fullName: nombreCompleto

    };
    this.previewImage = employee.photoUrl || null;

  }

  cancelEdit(): void {
    this.editingEmployee = null;
    this.previewImage = null;
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
        this.showSaveSuccess('Empleado actualizado correctamente.');
        this.editingEmployee = null;
        this.previewImage = null;
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

  getEmployeeFullName(employee: Employee): string {

    if (employee.fullName &&
      employee.fullName.trim() !== '') {

      return employee.fullName;

    }

    return [

      employee.firstName,

      employee.middleName,

      employee.lastName,

      employee.secondLastName

    ]
      .filter(value =>
        value &&
        value.trim() !== ''
      )
      .join(' ');

  }

  previewImage: string | null = null;

  onFileSelected(event: any): void {

    const file =
      event.target.files[0];

    if (!file) {

      return;

    }

    const reader = new FileReader();

    reader.onload = () => {

      this.previewImage =
        reader.result as string;

      if (this.editingEmployee) {

        this.editingEmployee.photoUrl =
          this.previewImage;

      } else if (this.showCreateModal) {

        this.newEmployee.photoUrl = this.previewImage;

      }

    };

    reader.readAsDataURL(file);

  }

  showExitConfirmation = false;

  confirmCloseEdit(): void {

    this.showExitConfirmation = true;

  }

  closeEditConfirmed(): void {

    this.showExitConfirmation = false;

    this.cancelEdit();

  }

  continueEditing(): void {

    this.showExitConfirmation = false;

  }

  showCreateModal = false;

  newEmployee: Omit<Employee, 'id'> = {} as Omit<Employee, 'id'>;

  openCreateEmployee(): void {

    this.newEmployee = {

      documentType: 'CC',

      documentNumber: '',

      firstName: '',

      middleName: '',

      lastName: '',

      secondLastName: '',

      fullName: '',

      sex: '',

      birthDate: '',

      address: '',

      city: '',

      phone: '',

      personalEmail: '',

      institutionalEmail: '',

      jobTitle: '',

      photoUrl: '',

      employmentStatus: 'ACTIVE',

      hireDate: '',

      endDate: '',

      accountNumber: '',

      contractType: '',

      salary: 0,

      age: 0,

    };

    this.previewImage = null;
    this.saveError = '';
    this.saveSuccess = '';
    this.showCreateModal = true;

  }

  saveNewEmployee(): void {

    if (this.saving) {
      return;
    }

    const employeeToCreate = {
      ...this.newEmployee,
      fullName: [
        this.newEmployee.firstName,
        this.newEmployee.middleName,
        this.newEmployee.lastName,
        this.newEmployee.secondLastName
      ]
        .filter(Boolean)
        .join(' ')
    };

    this.saving = true;
    this.saveError = '';
    this.saveSuccess = '';

    this.employeeService.create(employeeToCreate).subscribe({

      next: (createdEmployee) => {

        this.showCreateModal = false;

        this.employees = [...this.employees, createdEmployee];

        this.showSaveSuccess('Empleado creado correctamente.');
        this.saveError = '';
        this.saving = false;

        if (this.searched) {
          this.searchEmployee();
        }

      },

      error: (error) => {

        console.error('No se pudo crear el empleado.', error);
        this.saveError = 'No se pudo crear el empleado. Revisa los datos e inténtalo de nuevo.';
        this.saving = false;

      }

    });

  }

  deleteEmployee(employee: Employee): void {

    const confirmado = confirm(

      `¿Está seguro de retirar del directorio a ${this.getEmployeeFullName(employee)}?`

    );

    if (!confirmado) {

      return;

    }

    this.actionError = '';
    this.saveSuccess = '';

    this.employeeService.delete(employee.id).subscribe({

      next: () => {

        this.employees = this.employees.filter(({ id }) => id !== employee.id);
        this.saveSuccess = 'Empleado retirado del directorio correctamente.';

        if (this.searched) {
          this.searchEmployee();
        }

      },

      error: (error: HttpErrorResponse) => {

        console.error('No se pudo eliminar el empleado.', error);
        const detail = error.status === 0
          ? 'sin respuesta del servidor (HTTP 0)'
          : `HTTP ${error.status}`;
        this.actionError = `No se pudo eliminar el empleado (${detail}). Revisa la consola para ver el detalle.`;

      }

    });

  }

  actionError = '';

  cancelCreateEmployee(): void {
    this.showCreateModal = false;
    this.previewImage = null;
    this.saveError = '';
  }

}
