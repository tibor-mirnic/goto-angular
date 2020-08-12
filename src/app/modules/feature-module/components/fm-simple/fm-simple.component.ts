import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, HostBinding } from '@angular/core';

@Component({
  selector: 'fm-simple',
  templateUrl: './fm-simple.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FmSimpleComponent implements OnInit {

  @HostBinding('class')
  private _baseClass = 'fm-simple widget';

  constructor() { }

  ngOnInit(): void {
  }

}
