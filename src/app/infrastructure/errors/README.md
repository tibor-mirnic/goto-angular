## Errors

Here we define all base error types, they can be found in `models` folder.

It is a service that is provided in the `root` module.

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
        useClass: UnexpectedErrorHandler
      }]
    };
  }
}
```

## ErrorService

[ErrorService](https://github.com/tibor-mirnic/goto-angular/blob/master/src/app/infrastructure/errors/services/error-service.ts) is responsible for processing any errors that extend `ErrorBase` class.

Depending on the `ErrorType` it will emit `IProcessedErrorEvent`. This event can be consumed anywhere in the application, and for example, in case of `ProcessedErrorEvent.USER` you can show an toast message to the user.

## UnexpectedErrorHander

[UnexpectedErrorHandler](https://github.com/tibor-mirnic/goto-angular/blob/master/src/app/infrastructure/errors/util/unexpected-error.handler.ts) is custom global `ErrorHandler`. Here you could add an logging to your backend `API`.