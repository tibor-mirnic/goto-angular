import { ErrorBase } from './base';
import { ErrorType } from '../enum/error-type';

export class RequestTimeoutError extends ErrorBase {
  constructor(message = 'Connection to server has timed out', name = 'Request Timeout') {
    super(message, name, ErrorType.REQUEST_TIMEOOUT);
  }
}
