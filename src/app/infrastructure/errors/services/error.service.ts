import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';

import { ErrorBase } from '../models/base';
import { ProcessedErrorEventType } from '../models/enum/processed-error-event-type';
import { ErrorType } from '../models/enum/error-type';
import { IProcessedErrorEvent } from '../models/processed-error-event';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  didProcessError: Subject<IProcessedErrorEvent>;

  constructor() {
    this.didProcessError = new Subject<IProcessedErrorEvent>();
  }

  handleError(
    error: ErrorBase,
    processError: (error: ErrorBase) => void = null
  ): void {
    switch (error.type) {
      case ErrorType.APPLICATION:
      case ErrorType.NOT_FOUND:
      case ErrorType.USER_FRIENDLY:
      case ErrorType.AUTHORIZATION:
      case ErrorType.FORBIDDEN: {
        if (processError) {
          processError(error);
        }
        else {
          this.didProcessError.next({
            type: ProcessedErrorEventType.USER,
            error
          });
        }

        break;
      }
      case ErrorType.AUTHENTICATION:
      case ErrorType.CONNECTION: {
        if (processError) {
          processError(error);
        }

        this.didProcessError.next({
          type: ProcessedErrorEventType.SECURITY,
          error
        });

        break;
      }
      case ErrorType.CONFLICT: {
        if (processError) {
          processError(error);
        }

        this.didProcessError.next({
          type: ProcessedErrorEventType.CONFLICT,
          error
        });

        break;
      }

      default: {
        this.didProcessError.next({
          type: ProcessedErrorEventType.UNEXPECTED,
          error
        });
        break;
      }
    }
  }
}
