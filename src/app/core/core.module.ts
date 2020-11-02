import {NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule, registerLocaleData} from '@angular/common';
import localePt from '@angular/common/locales/pt';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {HeaderInterceptorService} from './interceptors/header-interceptor.service';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import {ErrorStateMatcher, MAT_DATE_LOCALE, ShowOnDirtyErrorStateMatcher} from '@angular/material/core';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeaderInterceptorService,
      multi: true
    },
    {
      provide: ErrorStateMatcher,
      useClass: ShowOnDirtyErrorStateMatcher
    },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {float: 'always'}
    },
    {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'},
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already imported in the AppModule');
    }
    registerLocaleData(localePt, 'pt');
  }
}
