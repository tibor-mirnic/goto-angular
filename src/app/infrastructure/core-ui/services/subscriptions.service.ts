import { Injectable, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Injectable()
export class SubscriptionsService implements OnDestroy {

  private _subscriptions: Subscription[];

  constructor() {
    this._subscriptions = [];
  }

  add(s: Subscription): void {
    this._subscriptions.push(s);
  }

  addMany(sbs: Subscription[]): void {
    this._subscriptions.push(...sbs);
  }

  ngOnDestroy(): void {
    this._subscriptions.forEach(a => a.unsubscribe());
  }
}
