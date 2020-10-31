import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {Activity} from '../models/activity';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {

  constructor(private http: HttpClient) {
  }

  index(projectId: number): Observable<Activity[]> {
    return this.http.get<Activity[]>(this.url(projectId));
  }

  create(projectId: number, data: Activity): Observable<Activity> {
    return this.http.post<Activity>(this.url(projectId), data);
  }

  update(projectId: number, data: Activity): Observable<Activity> {
    return this.http.put<Activity>(`${this.url(projectId)}/${data.id}`, data);
  }

  destroy(projectId: number, id: number): Observable<any> {
    return this.http.delete(`${this.url(projectId)}/${id}`);
  }

  private url(projectId: number): string {
    return `${environment.api_url}/projects/${projectId}/activities`;
  }
}
