import { ErrorBase } from './base';
import { ProcessedErrorEventType } from './enum/processed-error-event-type';

export interface IProcessedErrorEvent {
  type: ProcessedErrorEventType;
  error: ErrorBase | Error;
}
