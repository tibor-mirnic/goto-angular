import { ApplicationError } from '@modules/errors';

export class InternalServerError extends ApplicationError {
  constructor(message = 'Oops, there was an error', name = 'Internal Server') {
    super(message, name);
  }
}
