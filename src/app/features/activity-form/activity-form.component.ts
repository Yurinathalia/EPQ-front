import { Component } from '@angular/core';

@Component({
  selector: 'app-activity-form',
  standalone: false,
  templateUrl: './activity-form.component.html',
  styleUrls: ['./activity-form.component.scss']
})
export class ActivityFormComponent {

  form = {

    title: '',

    description: '',

    activityType: '',

    status: '',

    startAt: '',

    endAt: '',

    location: ''

  };

  save(): void {

    console.log(this.form);

  }

}
