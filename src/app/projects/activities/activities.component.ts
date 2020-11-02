import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {MatDialog} from '@angular/material/dialog';
import {ActivityDialogComponent} from '../activity-dialog/activity-dialog.component';
import {Activity} from '../../core/models/activity';
import {iif, Observable, of, Subject, zip} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {ActivitiesService} from '../../core/services/activities.service';
import {flatMap, map, take, takeUntil} from 'rxjs/operators';
import {ActivityDialogParams, DialogResult} from '../../core/models/dialog-result';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss'],
})
export class ActivitiesComponent implements OnInit, OnDestroy {
  projectId: number = this.activatedRoute.snapshot.params.id;
  destroy$ = new Subject<boolean>();
  allActivities$: Observable<Activity[]> = this.activitiesService.index(this.projectId);
  todo$: Observable<Observable<Activity>> = this.allActivities$
    .pipe(
      flatMap((activity) => activity),
      map((activity: Activity) =>
        iif(() => !activity.finished, of(activity))
      ),
    );

  done$: Observable<Observable<Activity>> = this.allActivities$
    .pipe(
      flatMap((activity) => activity),
      map((activity: Activity) =>
        iif(() => activity.finished, of(activity))
      ),
    );
  todo: Activity[] = [];
  done: Activity[] = [];

  constructor(private dialog: MatDialog,
              private activitiesService: ActivitiesService,
              private cdRef: ChangeDetectorRef,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  ngOnInit(): void {
    zip(this.todo$, this.done$)
      .pipe(take(1))
      .subscribe(([todo$, done$]) => {
        zip(todo$, done$)
          .pipe(takeUntil(this.destroy$))
          .subscribe(([todo, done]) => {
            this.todo.push(todo);
            this.done.push(done);
          });
      });
  }

  drop(event: CdkDragDrop<Activity[]>): void {
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
    this.openDialog();
  }

  onEditActivity(activity: Activity): void {
    if (!activity.finished) {
      this.openDialog(activity);
    }
  }

  private openDialog(activity?: Activity): void {
    const params: ActivityDialogParams = {
      activity,
      project_id: activity.project_id
    };
    const ref$ = this.dialog.open(ActivityDialogComponent, {
      data: params,
      minWidth: '33vh'
    });
    ref$.afterClosed().pipe(take(1)).subscribe((result: DialogResult) => {
      switch (result.action) {
        case 'create':
          this.addActivity(result.activity);
          break;
        case 'update':
          this.updateActivity(result.activity);
          break;
        case 'delete':
          this.removeActivity(result.activity);
          break;
      }
    });
  }

  private addActivity(activity: Activity): void {
    this.activitiesService.create(activity.project_id, activity)
      .pipe(take(1))
      .subscribe((data) => {
        this.todo.push(data);
        this.cdRef.detectChanges();
      });
  }

  private updateActivity(activity: Activity): void {
    this.activitiesService.update(activity.project_id, activity)
      .pipe(take(1))
      .subscribe((data) => {
        const index = this.todo.findIndex((a) => a.id === data.id);
        this.todo.splice(index, 1, data);
        this.cdRef.detectChanges();
      });
  }

  private removeActivity(activity: Activity): void {
    this.activitiesService.destroy(activity.project_id, activity.id)
      .pipe(take(1))
      .subscribe(() => {
        const index = this.todo.findIndex((a) => a.id === activity.id);
        this.todo.splice(index, 1);
        this.cdRef.detectChanges();
      });
  }
}
