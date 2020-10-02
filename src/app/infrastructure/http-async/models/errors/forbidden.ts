import { ErrorBase, ErrorType } from '@modules/errors';

export class ForbiddenError extends ErrorBase {
  constructor(message = 'You are not permitted to use this resource', name = 'Forbidden') {
    super(message, name, ErrorType.FORBIDDEN);
  }
}
