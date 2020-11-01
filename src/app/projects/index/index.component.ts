import {Component, OnInit} from '@angular/core';
import {ProjectsService} from '../../core/services/projects.service';
import {MatDialog} from '@angular/material/dialog';
import {Project} from '../../core/models/project';
import {ProjectDialogComponent} from '../project-dialog/project-dialog.component';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  projects$ = this.projectService.index();

  constructor(private projectService: ProjectsService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  openAddDialog(): void {
    this.dialog.open(ProjectDialogComponent, {
      minWidth: '33vh'
    });
  }

  openEditDialog(project: Project): void {
    this.dialog.open(ProjectDialogComponent, {
      data: project,
      minWidth: '33vh'
    });
  }

}
