import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, HostBinding, OnDestroy, ChangeDetectorRef } from '@angular/core';

import { SubscriptionsService } from '@modules/core-ui';

import { FmParentContext } from './fm-parent.context';

@Component({
  selector: 'fm-parent',
  templateUrl: './fm-parent.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [FmParentContext, SubscriptionsService]
})
export class FmParentComponent implements OnInit {

  @HostBinding('class')
  private _baseClass = 'fm-parent cui-widget';

  isLoading: boolean;

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _context: FmParentContext,
    private _subscriptions: SubscriptionsService
  ) { }

  ngOnInit(): void {
    this._subscriptions.addMany([
      this._context.isLoading.subscribe(isLoading => this.setLoadingState(isLoading)),
    ]);

    this._context.init();
  }

  onUpdateChildOne(): void {
    this._context.updateChildOne();
  }

  onUpdateChildTwo(): void {
    this._context.updateChildTwo('Updated First Child Name');
  }

  onRefreshChildTwo(): void {
    this._context.refreshChildTwo();
  }

  private setLoadingState(isLoading: boolean): void {
    this.isLoading = isLoading;
    this._changeDetectorRef.detectChanges();
  }
}
