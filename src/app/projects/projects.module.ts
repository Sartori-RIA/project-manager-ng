import {NgModule} from '@angular/core';

import {ProjectsRoutingModule} from './projects-routing.module';
import {IndexComponent} from './index/index.component';
import {ShowComponent} from './show/show.component';
import {MatListModule} from '@angular/material/list';
import {SharedModule} from '../shared/shared.module';


@NgModule({
  declarations: [
    IndexComponent,
    ShowComponent
  ],
  imports: [
    SharedModule,
    ProjectsRoutingModule,
    MatListModule
  ]
})
export class ProjectsModule {
}
