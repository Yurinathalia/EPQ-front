import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { EmployeeAbsence }
from '../models/employee-absence.model';

@Injectable({
  providedIn: 'root'
})
export class AbsenceService {

  private apiUrl =
  'http://localhost:8080/api/v1/absences';

  constructor(
    private http: HttpClient
  ) {}

  getAll(): Observable<EmployeeAbsence[]> {

    return this.http.get<EmployeeAbsence[]>(
      this.apiUrl
    );

  }

  save(
    absence: EmployeeAbsence
  ): Observable<EmployeeAbsence> {

    return this.http.post<EmployeeAbsence>(
      this.apiUrl,
      absence
    );

  }

}
