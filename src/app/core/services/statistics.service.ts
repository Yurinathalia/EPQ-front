import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Statistics } from '../models/statistics.model';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  private readonly apiUrl =
    'http://localhost:8080/api/statistics/overview';

  constructor(
    private http: HttpClient
  ) {}

  getDashboardStatistics(): Observable<Statistics> {

    return this.http.get<Statistics>(
      this.apiUrl
    );

  }
}
