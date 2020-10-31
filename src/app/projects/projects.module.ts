import {NgModule} from '@angular/core';

import {ProjectsRoutingModule} from './projects-routing.module';
import {IndexComponent} from './index/index.component';
import {ShowComponent} from './show/show.component';
import {MatListModule} from '@angular/material/list';
import {SharedModule} from '../shared/shared.module';
import { ActivitiesComponent } from './activities/activities.component';
import { DragDropModule } from '@angular/cdk/drag-drop';


@NgModule({
  declarations: [
    IndexComponent,
    ShowComponent,
    ActivitiesComponent
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
