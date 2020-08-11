import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, HostBinding, ChangeDetectorRef } from '@angular/core';

import { filter } from 'rxjs/operators';

import { SubscriptionsService, ContextEvent } from '@modules/core-ui';

import { FmParentContext } from '../fm-parent.context';
import { FmParentContextEvent } from '../../../models/enums/fm-parent/fm-parent-context-event';

@Component({
  selector: 'fm-child-one',
  templateUrl: './fm-child-one.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FmChildOneComponent implements OnInit {

  @HostBinding('class')
  private _isCmp = 'fm-child-two widget';

  name: string;

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _context: FmParentContext,
    private _subscriptions: SubscriptionsService
  ) { }

  ngOnInit(): void {
    this._subscriptions.addMany([
      this._context.onEvent
        .pipe(filter(evt => evt.event === ContextEvent.INIT))
        .subscribe(evt => {
          this.name = evt.model.childOne.name;
          this._changeDetectorRef.detectChanges();
      }),

      this._context.onEvent
        .pipe(filter(evt => evt.event === FmParentContextEvent.CHILD_ONE_UPDATED))
        .subscribe(evt => {
          this.name = evt.model.childOne.name;
          this._changeDetectorRef.detectChanges();
      })
    ]);
  }

}
