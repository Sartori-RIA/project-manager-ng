import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {ProjectsService} from '../../core/services/projects.service';
import {MatDialog} from '@angular/material/dialog';
import {ProjectDialogComponent} from '../project-dialog/project-dialog.component';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IndexComponent implements OnInit, OnDestroy {

  projects$ = this.projectService.index();
  search: string;

  constructor(private projectService: ProjectsService,
              private cdRefs: ChangeDetectorRef,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }


  openAddDialog(): void {
    this.dialog.open(ProjectDialogComponent, {
      minWidth: '33vh'
    });
  }


  onSearch(event: string): void {
    this.projects$ = this.projectService.search(event);
    this.cdRefs.detectChanges();
  }
}
