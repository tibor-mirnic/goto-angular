import { ErrorBase, ErrorType } from '@modules/errors';

export class RequestTimeoutError extends ErrorBase {
  constructor(message = 'Connection to server has timed out', name = 'Request Timeout') {
    super(message, name, ErrorType.REQUEST_TIMEOOUT);
  }
}

export class GatewayTimeoutError extends ErrorBase {
  constructor(message = 'Connection to server has timed out', name = 'Gateway Timeout') {
    super(message, name, ErrorType.REQUEST_TIMEOOUT);
  }
}
