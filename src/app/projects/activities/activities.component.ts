import {Component, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {MatDialog} from '@angular/material/dialog';
import {ActivityDialogComponent, ActivityDialogParams} from '../activity-dialog/activity-dialog.component';
import {Activity} from '../../core/models/activity';
import {Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {ActivitiesService} from '../../core/services/activities.service';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss'],
})
export class ActivitiesComponent implements OnInit {
  projectId: number = this.activatedRoute.snapshot.params.id;
  todo$: Observable<Activity[]> = this.activitiesService.index(this.projectId);
  done$: Observable<Activity[]> = this.activitiesService.index(this.projectId);
  todo: Activity[] = [{
    name: 'asdasd',
    id: 1,
    created_at: new Date(),
    end_date: new Date(),
    finished: false,
    project_id: 1,
    start_date: new Date(),
    updated_at: new Date()
  }];
  done: Activity[] = [];

  constructor(private dialog: MatDialog,
              private activitiesService: ActivitiesService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.todo$.pipe(take(1)).subscribe((todo) => this.todo = todo);
    this.done$.pipe(take(1)).subscribe((done) => this.done = done);
  }

  drop(event: CdkDragDrop<string[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  onAddActivity(): void {
    const params: ActivityDialogParams = {
      project_id: this.projectId
    };
    this.dialog.open(ActivityDialogComponent, {
      minWidth: '33vh',
      data: params
    });
  }

  onEditActivity(activity: Activity): void {
    const params: ActivityDialogParams = {
      activity,
      project_id: activity.project_id
    };
    this.dialog.open(ActivityDialogComponent, {
      data: params,
      minWidth: '33vh'
    });
  }
}
