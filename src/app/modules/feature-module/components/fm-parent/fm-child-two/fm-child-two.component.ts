import { Component, OnInit, HostBinding, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

import { SubscriptionsService, ContextEvent } from '@modules/core-ui';

import { filter } from 'rxjs/operators';

import { FmParentContext } from '../fm-parent.context';
import { FmParentContextEvent } from '../../../models/enums/fm-parent/fm-parent-context-event';
import { FmParentContextCommand } from '../../../models/enums/fm-parent/fm-parent-context-command';

@Component({
  selector: 'fm-child-two',
  templateUrl: './fm-child-two.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SubscriptionsService]
})
export class FmChildTwoComponent implements OnInit {

  @HostBinding('class')
  private _baseClass = 'fm-child-two widget';

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
          this.name = evt.model.childTwo.name;
          this._changeDetectorRef.detectChanges();
      }),

      this._context.onEvent
        .pipe(filter(evt => evt.event === FmParentContextEvent.CHILD_TWO_UPDATED))
        .subscribe(evt => {
          this.name = evt.model.childTwo.name;
          this._changeDetectorRef.detectChanges();
      }),

      this._context.onCommand
        .pipe(filter(cmd => cmd === FmParentContextCommand.REFRESH_CHILD_TWO))
        .subscribe(() => {
          this._context.updateChildTwo('Second Child');
        })
    ]);
  }

}
