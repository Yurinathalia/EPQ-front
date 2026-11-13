export interface Activity {

  id: number;

  title: string;

  description: string;

  activityType: string;

  status: string;

  startAt: string;

  endAt: string;

  location: string;

  dependencyId: number;

  responsibleEmployeeId: number;

}
