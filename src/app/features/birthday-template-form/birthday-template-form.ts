import { Component } from '@angular/core';

@Component({
  selector: 'app-birthday-template-form',
  standalone: false,
  templateUrl: './birthday-template-form.html',
  styleUrls: ['./birthday-template-form.scss']
})
export class BirthdayTemplateFormComponent {

  template = {

    name: '',

    message: '',

    active: true

  };

  previewImage: string | ArrayBuffer | null = null;

  selectedFileName = 'Ningún archivo seleccionado';

  onFileSelected(event: Event): void {
    const input = event.target;
    if (!(input instanceof HTMLInputElement)) {
      return;
    }

    const file = input.files?.[0];

    if (!file) {
      this.selectedFileName = 'Ningún archivo seleccionado';
      return;
    }

    this.selectedFileName = file.name;
    const reader = new FileReader();

    reader.onload = () => {

      this.previewImage = reader.result;

    };

    reader.readAsDataURL(file);

  }

  save(): void {

    console.log(this.template);

  }

}
