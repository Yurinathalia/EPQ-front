import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dependency-detail',
  standalone: false,
  templateUrl: './dependency-detail.component.html',
  styleUrls: ['./dependency-detail.component.scss']
})
export class DependencyDetailComponent implements OnInit {

  dependency = {
    id: 1,
    name: 'Talento Humano',
    description: 'Área de gestión del talento humano',
    responsible: 'Luis Fernando Ramírez',
    employeeCount: 15
  };

  employees = [
    {
      document: '1090274821',
      fullName: 'Jazmin Nathalia Garcia Ocampo',
      position: 'Pasante'
    }
  ];

  constructor() {}

  ngOnInit(): void {}

}
