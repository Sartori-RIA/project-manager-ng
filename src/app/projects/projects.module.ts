import {NgModule} from '@angular/core';

import {ProjectsRoutingModule} from './projects-routing.module';
import {IndexComponent} from './index/index.component';
import {ShowComponent} from './show/show.component';
import {MatListModule} from '@angular/material/list';
import {SharedModule} from '../shared/shared.module';
import {ActivitiesComponent} from './activities/activities.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {ActivityDialogComponent} from './activity-dialog/activity-dialog.component';


@NgModule({
  declarations: [
    IndexComponent,
    ShowComponent,
    ActivitiesComponent,
    ActivityDialogComponent
  ],
  imports: [
    SharedModule,
    ProjectsRoutingModule,
    MatListModule,
    DragDropModule
  ]
})
export class ProjectsModule {
}
