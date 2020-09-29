import { ErrorType } from '../enum/error-type';

export interface IErrorBase {
  name: string;
  message: string;
  type: ErrorType;
}

export class ErrorBase extends Error implements IErrorBase {

  message: string;
  name: string;
  type: ErrorType;

  constructor(message: string, name = 'Error', type = ErrorType.DEFAULT) {
    super(message);

    this.message = message;
    this.name = name;
    this.type = type;
  }
}
