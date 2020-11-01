import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDividerModule} from '@angular/material/divider';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatMomentDateModule} from '@angular/material-moment-adapter';

const MAT_MODULES = [
  MatListModule,
  MatButtonModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  DragDropModule,
  MatToolbarModule,
  MatDividerModule,
  MatDialogModule,
  MatDatepickerModule,
  MatMomentDateModule
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...MAT_MODULES
  ],
  exports: [
    ...MAT_MODULES
  ]
})
export class MaterialModule {
}
