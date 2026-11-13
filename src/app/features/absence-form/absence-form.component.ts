import { Component } from '@angular/core';

@Component({
  selector: 'app-absence-form',
  standalone: false,
  templateUrl: './absence-form.component.html',
  styleUrls: ['./absence-form.component.scss']
})
export class AbsenceFormComponent {

  form = {
    employeeSearch: '',
    absenceType: '',
    startDate: '',
    endDate: '',
    referenceCode: '',
    generalNote: ''
  };

  save(): void {
    console.log(this.form);
  }

}
