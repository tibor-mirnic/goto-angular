import { ErrorHandler, Injector, Inject, Injectable } from '@angular/core';

import { ErrorService } from '../../errors/services/error-service';
import { ProcessedErrorEventType } from '../models/enum/processed-error-event-type';

@Injectable()
export class LvUnexpectedErrorHandler implements ErrorHandler {

  constructor(
    @Inject(Injector) private injector: Injector
  ) {}

  handleError(error: Error | string): void {
    /*
    * Here we handle all unexpected errors and uncaught promise rejections
    */
    const errorService = this.injector.get<ErrorService>(ErrorService);

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
