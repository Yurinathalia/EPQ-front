import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Birthday } from '../models/birthday.model';

@Injectable({
  providedIn: 'root'
})
export class BirthdayService {

  private apiUrl =
    'http://localhost:8080/api/v1/birthdays';

  constructor(
    private http: HttpClient
  ) {}

  getBirthdays(): Observable<Birthday[]> {

    return this.http.get<Birthday[]>(
      this.apiUrl
    );

  }

}
