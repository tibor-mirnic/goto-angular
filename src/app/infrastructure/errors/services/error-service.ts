import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';

import { ErrorBase } from '../models/base';
import { ErrorType } from '../models/enum/error-type';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  public didUserFriendlyErrorOccured: Subject<ErrorBase>;
  public didAuthenticationErrorOccured: Subject<ErrorBase>;
  public didConflictErrorOccured: Subject<ErrorBase>;
  public didUnexpectedErrorOccured: Subject<Error>;

  constructor() {
    this.didUserFriendlyErrorOccured = new Subject<ErrorBase>();
    this.didAuthenticationErrorOccured = new Subject<ErrorBase>();
    this.didConflictErrorOccured = new Subject<ErrorBase>();
    this.didUnexpectedErrorOccured = new Subject<Error>();
  }

  public handleError(
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
          this.didUserFriendlyErrorOccured.next(error);
        }

        break;
      }
      case ErrorType.AUTHENTICATION:
      case ErrorType.CONNECTION: {
        if (processError) {
          processError(error);
        }

        this.didAuthenticationErrorOccured.next(error);

        break;
      }
      case ErrorType.CONFLICT: {
        if (processError) {
          processError(error);
        }

        this.didConflictErrorOccured.next(error);

        break;
      }

      default: {
        this.didUnexpectedErrorOccured.next(error);
        break;
      }
    }
  }
}
