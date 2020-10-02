import { Observable, Subject } from 'rxjs';

import { EnumType } from '../models/enum/enum-type';
import { ContextEvent } from '../models/enum/context/context-event';
import { ContextCommand } from '../models/enum/context/context-command';
import { IContextEvent } from '../models/context';

export abstract class Context<T, E extends typeof EnumType, C extends typeof EnumType> {

  private _model: T;

  private _isLoading: Subject<boolean>;
  private _onEvent: Subject<IContextEvent<T, E | ContextEvent>>;
  private _onCommand: Subject<C | ContextCommand>;

  get isLoading(): Observable<boolean> {
    return this._isLoading.asObservable();
  }

  get onEvent(): Observable<IContextEvent<T, E | ContextEvent>> {
    return this._onEvent.asObservable();
  }

  get onCommand(): Observable<C | ContextCommand> {
    return this._onCommand.asObservable();
  }

  constructor() {
    this._model = null;

    this._isLoading = new Subject<boolean>();
    this._onEvent = new Subject<IContextEvent<T, E | ContextEvent>>();
    this._onCommand = new Subject<C>();
  }

  async init(): Promise<void> {
    try {
      this.setIsLoading(true);

      this._model = await this.getModel();

      this.publishEvent(ContextEvent.INIT);
    }
    catch (error) {
      throw error;
    }
    finally {
      this.setIsLoading(false);
    }
  }

  protected updateModel(
    event: E | ContextEvent,
    update: (model: T) => T
    ): void {
    this._model = update(this._model);
    this.publishEvent(event);
  }

  protected executeCommand(command: C | ContextCommand): void {
    this._onCommand.next(command);
  }

  protected setIsLoading(isLoading: boolean): void {
    this._isLoading.next(isLoading);
  }

  protected abstract getModel(): Promise<T>;

  private publishEvent(event: E | ContextEvent): void {
    this._onEvent.next({
      model: this._model,
      event
    });
  }
}
