import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MaterialModule} from '../material/material.module';
import { FabComponent } from './components/fab/fab.component';


const NG_MODULES = [
  CommonModule,
  HttpClientModule,
  ReactiveFormsModule,
  FlexLayoutModule,
  MaterialModule
];

@NgModule({
  declarations: [FabComponent],
  imports: [
    ...NG_MODULES
  ],
    exports: [
        ...NG_MODULES,
        FabComponent
    ]
})
export class SharedModule {
}
