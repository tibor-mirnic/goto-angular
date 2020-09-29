import { ErrorBase } from './base';
import { ErrorType } from '../enum/error-type';

export class UserFriendlyError extends ErrorBase {
  constructor(message = 'You have ana error', name = 'User Friendly') {
    super(message, name, ErrorType.USER_FRIENDLY);
  }
}

export class BadRequestError extends UserFriendlyError {
  constructor(message = 'Bad Request. Please check your parameters') {
    super(message, 'Bad Request');
  }
}

export class NotImplementedError extends UserFriendlyError {
  constructor(message = 'This feature is not implemented') {
    super(message, 'Not Implemented');
  }
}
