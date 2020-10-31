import {Component, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {MatDialog} from '@angular/material/dialog';
import {ActivityDialogComponent} from '../activity-dialog/activity-dialog.component';
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
  todo: Activity[] = [];
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
    this.dialog.open(ActivityDialogComponent, {
      minWidth: '33vh'
    });
  }

  onEditActivity(activity: Activity): void {
    this.dialog.open(ActivityDialogComponent, {
      data: activity,
      minWidth: '33vh'
    });
  }
}
