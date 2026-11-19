import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee.model';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  private readonly apiUrl = 'http://localhost:8080/api/v1/employees';

  constructor(private readonly http: HttpClient) { }

  getAll(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl);
  }

  update(
    id: number,
    employee: Employee
  ): Observable<Employee> {

    return this.http.put<Employee>(
      `${this.apiUrl}/${id}`,
      employee
    );

  }

  create(employee: Omit<Employee, 'id'>): Observable<Employee> {

    return this.http.post<Employee>(
      this.apiUrl,
      employee
    );

  }

  delete(id: number): Observable<void> {

    return this.http.delete<void>(
      `${this.apiUrl}/${id}`
    );

  }


}
