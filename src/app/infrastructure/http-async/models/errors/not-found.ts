import { ErrorBase, ErrorType } from '@modules/errors';

export class NotFoundError extends ErrorBase {
  constructor(message = 'Required resource is not found', name = 'Not Found') {
    super(message, name, ErrorType.NOT_FOUND);
  }
}
