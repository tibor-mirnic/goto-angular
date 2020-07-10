import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, HostBinding, OnDestroy, ChangeDetectorRef } from '@angular/core';

import { Subscription } from 'rxjs';

import { FmParentContext } from './fm-parent.context';

@Component({
  selector: 'fm-parent',
  templateUrl: './fm-parent.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [FmParentContext]
})
export class FmParentComponent implements OnInit, OnDestroy {

  @HostBinding('class')
  private _isCmp = 'fm-parent widget';

  private _subscriptions: Subscription[];

  public isLoading: boolean;

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _context: FmParentContext
  ) { }

  ngOnInit(): void {
    this._subscriptions = [
      this._context.isLoading.subscribe(isLoading => this.setLoadingState(isLoading))
    ];

    this._context.init();
  }

  ngOnDestroy() {
    this._subscriptions.forEach(a => a.unsubscribe());
  }

  private setLoadingState(isLoading: boolean) {
    this.isLoading = isLoading;
    this._changeDetectorRef.detectChanges();
  }
}
