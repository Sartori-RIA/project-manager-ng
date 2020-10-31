import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MaterialModule} from '../material/material.module';


const NG_MODULES = [
  CommonModule,
  HttpClientModule,
  ReactiveFormsModule,
  FlexLayoutModule,
  MaterialModule
];

@NgModule({
  declarations: [],
  imports: [
    ...NG_MODULES
  ],
  exports: [
    ...NG_MODULES
  ]
})
export class SharedModule {
}
