import { Directive, Input, ElementRef, NgZone, Renderer2, OnInit } from '@angular/core';

import { IRunOutsideAngularEvent } from '../models/run-outside-angular-event';
import { EmptyCallback } from '../models/callback';

@Directive({
  selector: '[runEventsOutsideAngular]'
})
export class RunEventsOutsideAngularDirective implements OnInit {

  private _listeners: EmptyCallback[];
  
  @Input('runEventsOutsideAngular')
  public events: IRunOutsideAngularEvent[];

  constructor(
    private _ngZone: NgZone,
    private _elementRef: ElementRef,
    private _renderer: Renderer2
  ) {
    this._listeners = [];
    this.events = [];
  }

  ngOnInit() {
    this._ngZone.runOutsideAngular(() => {
      const el = this._elementRef.nativeElement;
      this.events.forEach(e => this._listeners.push(this._renderer.listen(el, e.name, e.callback)));
    });
  }

  ngOnDestroy() {
    this._listeners.forEach(a => a());
  }

}
