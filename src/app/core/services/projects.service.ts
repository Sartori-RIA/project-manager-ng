import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Project} from '../models/project';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  private readonly url = environment.api_url + '/projects';

  constructor(protected http: HttpClient) {
  }

  index(): Observable<Project[]> {
    return this.http.get<Project[]>(this.url);
  }

  show(id: number): Observable<Project> {
    return this.http.get<Project>(`${this.url}/${id}`);
  }

  search(search: string): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.url}/search`, {params: {q: search}});
  }

  create(data: Project): Observable<Project> {
    return this.http.post<Project>(this.url, data);
  }

  update(data: Project): Observable<Project> {
    return this.http.put<Project>(`${this.url}/${data.id}`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }
}
