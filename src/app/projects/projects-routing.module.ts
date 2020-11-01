import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ShowComponent} from './show/show.component';
import {IndexComponent} from './index/index.component';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
  },
  {
    path: ':id',
    component: ShowComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule {
}
