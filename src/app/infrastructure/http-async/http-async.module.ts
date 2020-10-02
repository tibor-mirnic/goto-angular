import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { HTTP_ASYNC_CONFIG } from './models/tokens';
import { IHttpAsyncConfig } from './models/http-async-config';
import { HttpTimeoutInterceptor } from './interceptors/http-timeout.interceptor';
import { HttpAuthorizationInterceptor } from './interceptors/http-authorization.interceptor';
import { HttpHeadersInterceptor } from './interceptors/http-headers.interceptor';
import { HttpErrorInterceptor } from './interceptors/http-error.interceptor';

@NgModule()
export class HttpAsyncModule {

  constructor(
    @Optional() @SkipSelf() module: HttpAsyncModule
  ) {
    if (module) {
      throw new Error('HttpAsyncModule has already been loaded.');
    }
  }

  public static forRoot(config: IHttpAsyncConfig): ModuleWithProviders<HttpAsyncModule> {
    return {
      ngModule: HttpAsyncModule,
      providers: [{
        provide: HTTP_ASYNC_CONFIG,
        useValue: config
      }, {
        provide: HTTP_INTERCEPTORS,
        useClass: HttpHeadersInterceptor,
        multi: true
      }, {
        provide: HTTP_INTERCEPTORS,
        useClass: HttpTimeoutInterceptor,
        multi: true
      }, {
        provide: HTTP_INTERCEPTORS,
        useClass: HttpAuthorizationInterceptor,
        multi: true
      }, {
        provide: HTTP_INTERCEPTORS,
        useClass: HttpErrorInterceptor,
        multi: true
      }]
    };
  }
}
