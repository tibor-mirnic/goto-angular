import { ErrorHandler, Injector, Inject, Injectable } from '@angular/core';

import { ErrorService } from '../services/error.service';
import { ProcessedErrorEventType } from '../models/enum/processed-error-event-type';

@Injectable()
export class UnexpectedErrorHandler implements ErrorHandler {

  constructor(
    @Inject(Injector) private _injector: Injector
  ) {}

  handleError(error: Error | string): void {
    /*
    * Here we handle all unexpected errors and uncaught promise rejections
    */
    const errorService = this._injector.get<ErrorService>(ErrorService);

    if (typeof(error) === 'string') {
      error = new Error(error);
      error.name = 'Unexpected Error';
    }

    errorService.didProcessError.next({
      type: ProcessedErrorEventType.UNEXPECTED,
      error
    });
    console.error(error);
  }
}
