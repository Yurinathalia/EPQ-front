import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { EmployeeHistory } from '../models/employee-history.model';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  private apiUrl =
    'http://localhost:8080/api/v1/history';

  constructor(
    private http: HttpClient
  ) {}

  getAll(): Observable<EmployeeHistory[]> {

    return this.http.get<EmployeeHistory[]>(
      this.apiUrl
    );

  }

}
