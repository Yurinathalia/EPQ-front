import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Activity } from '../models/activity.model';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  private apiUrl =
    'http://localhost:8080/api/v1/activities';

  constructor(
    private http: HttpClient
  ) {}

  getAll(): Observable<Activity[]> {

    return this.http.get<Activity[]>(
      this.apiUrl
    );

  }

  save(
    activity: Activity
  ): Observable<Activity> {

    return this.http.post<Activity>(
      this.apiUrl,
      activity
    );

  }

}
