import { ErrorBase } from './base';
import { ErrorType } from './enum/error-type';

export class ConflictError extends ErrorBase {
  constructor(message = 'Conflict', name = 'Conflict') {
    super(message, name, ErrorType.CONFLICT);
  }
}
