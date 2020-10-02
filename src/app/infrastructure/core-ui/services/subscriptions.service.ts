import { Injectable, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Injectable()
export class SubscriptionsService implements OnDestroy {

  private _subscriptions: Subscription[];

  constructor() {
    this._subscriptions = [];
  }

  public add(s: Subscription): void {
    this._subscriptions.push(s);
  }

  public addMany(sbs: Subscription[]): void {
    this._subscriptions.push(...sbs);
  }

  public ngOnDestroy(): void {
    this._subscriptions.forEach(a => a.unsubscribe());
  }
}
