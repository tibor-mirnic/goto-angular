import { ErrorBase, ErrorType } from '@modules/errors';

export class ConflictError extends ErrorBase {
  constructor(message = 'Conflict', name = 'Conflict') {
    super(message, name, ErrorType.CONFLICT);
  }
}
