import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {map} from 'rxjs/operators';
import {Observable} from "rxjs";
import {Project} from "../../core/models/project";
import {ProjectDialogComponent} from "../project-dialog/project-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit {

  project$: Observable<Project> = this.activatedRoute.data.pipe(map((data) => data.project));

  constructor(private activatedRoute: ActivatedRoute,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {

  }

  openEditDialog(project: Project): void {
    this.dialog.open(ProjectDialogComponent, {
      data: project,
      minWidth: '33vh'
    });
  }
}
