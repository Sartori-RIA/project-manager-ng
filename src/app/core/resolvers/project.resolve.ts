import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Project} from '../models/project';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ProjectsService} from '../services/projects.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectResolve implements Resolve<Project> {

  constructor(private service: ProjectsService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Project> | Promise<Project> | Project {
 //   return this.service.show(route.params.id);
    return null;
  }
}
