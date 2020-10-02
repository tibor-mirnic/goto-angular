import { ErrorBase } from './base';
import { ErrorType } from './enum/error-type';

export class NotFoundError extends ErrorBase {
  constructor(message = 'Required resource is not found', name = 'Not Found') {
    super(message, name, ErrorType.NOT_FOUND);
  }
}
