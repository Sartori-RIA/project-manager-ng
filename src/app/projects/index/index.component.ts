import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ProjectsService} from '../../core/services/projects.service';
import {MatDialog} from '@angular/material/dialog';
import {ProjectDialogComponent, ProjectDialogResult} from '../project-dialog/project-dialog.component';
import {take} from 'rxjs/operators';
import {Project} from '../../core/models/project';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IndexComponent implements OnInit {

  projects$ = this.projectService.index();
  projects: Project[] = [];
  search: string;

  constructor(private projectService: ProjectsService,
              private cdRefs: ChangeDetectorRef,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.setProjects();
  }

  openAddDialog(): void {
    const res$ = this.dialog.open(ProjectDialogComponent, {
      minWidth: '33vh'
    });
    res$.afterClosed().pipe(take(1)).subscribe((res: ProjectDialogResult) => {
      this.projectService.create(res.data)
        .pipe(take(1))
        .subscribe((project) => {
          this.projects.unshift(project);
          this.cdRefs.detectChanges();
        });
    });
  }


  onSearch(event: string): void {
    this.projects$ = this.projectService.search(event);
    this.setProjects();
  }

  private setProjects(): void {
    this.projects$.pipe(take(1)).subscribe((projects) => {
      this.projects = projects;
      this.cdRefs.detectChanges();
    });
  }
}
