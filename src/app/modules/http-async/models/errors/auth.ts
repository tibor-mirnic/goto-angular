import { ErrorBase } from './base';
import { ErrorType } from '../enum/error-type';

export class AuthorizationError extends ErrorBase {
  constructor(message = 'Unauthorized access', name = 'Authorization') {
    super(message, name, ErrorType.AUTHORIZATION);
  }
}

export class AuthenticationError extends ErrorBase {
  constructor(message = 'Cannot authenticate', name = 'Authentication') {
    super(message, name, ErrorType.AUTHENTICATION);
  }
}

export class ConnectionError extends ErrorBase {
  constructor(message = 'Cannot connect', name = 'Connection') {
    super(message, name, ErrorType.CONNECTION);
  }
}
