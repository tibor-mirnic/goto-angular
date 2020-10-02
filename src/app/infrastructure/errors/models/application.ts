import { ErrorBase } from './base';
import { ErrorType } from './enum/error-type';

export class ApplicationError extends ErrorBase {
  constructor(message = 'Code execution failed', name = 'Application') {
    super(message, name, ErrorType.APPLICATION);
  }
}

export class InternalServerError extends ApplicationError {
  constructor(message = 'Oops, there was an error', name = 'Internal Server') {
    super(message, name);
  }
}

export class MissingArgumentsError extends ApplicationError {
  constructor(message = 'Missing arguments') {
    super(message, 'Missing Arguments');
  }
}
