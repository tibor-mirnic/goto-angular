## Errors

Here we define all base error types, they can be found in `models` folder.

Also we have defined an [ErrorService](https://github.com/tibor-mirnic/goto-angular/blob/master/src/app/infrastructure/errors/services/error-service.ts) which is responsible for processing errors.

And we have a global [UnexpectedErrorHandler](https://github.com/tibor-mirnic/goto-angular/blob/master/src/app/infrastructure/errors/util/unexpected-error.handler.ts).

```
@NgModule()
export class ErrorsModule {

  constructor(
    @Optional() @SkipSelf() module: ErrorsModule
  ) {
    if (module) {
      throw new Error('ErrorsModule has already been loaded.');
    }
  }

  static forRoot(): ModuleWithProviders<ErrorsModule> {
    return {
      ngModule: ErrorsModule,
      providers: [{
        provide: ErrorHandler,
        useClass: LvUnexpectedErrorHandler
      }]
    };
  }
}
```
