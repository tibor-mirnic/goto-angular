import { ErrorHandler, ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { LvUnexpectedErrorHandler } from './util/unexpected-error.handler';

@NgModule()
export class ErrorsModule {

  constructor(
    @Optional() @SkipSelf() module: ErrorsModule
  ) {
    if (module) {
      throw new Error('ErrorsModule has already been loaded.');
    }
  }

  public static forRoot(): ModuleWithProviders<ErrorsModule> {
    return {
      ngModule: ErrorsModule,
      providers: [{
        provide: ErrorHandler,
        useClass: LvUnexpectedErrorHandler
      }]
    };
  }
}
