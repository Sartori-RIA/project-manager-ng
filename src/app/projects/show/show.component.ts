import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {map, take} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Project} from '../../core/models/project';
import {ProjectDialogComponent, ProjectDialogResult} from '../project-dialog/project-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {ProjectsService} from '../../core/services/projects.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit {

  project$: Observable<Project> = this.activatedRoute.data.pipe(map((data) => data.project));
  project: Project;

  constructor(private activatedRoute: ActivatedRoute,
              private projectService: ProjectsService,
              private router: Router,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.setProjectData();
  }

  openEditDialog(): void {
    const refs$ = this.dialog.open(ProjectDialogComponent, {
      data: this.project,
      minWidth: '33vh'
    });
    refs$.afterClosed().pipe(take(1)).subscribe((params: ProjectDialogResult) => {
      this.projectService.update(params.data)
        .pipe(take(1))
        .subscribe((res) => this.project = res);
    });
  }

  removeProject(): void {
    this.projectService.delete(this.project.id)
      .pipe(take(1))
      .subscribe(() => this.router.navigateByUrl('/'));
  }

  private setProjectData(): void {
    this.project$.pipe(take(1)).subscribe((project) => {
      this.project = project;
    });
  }
}
