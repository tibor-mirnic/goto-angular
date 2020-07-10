import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, HostBinding } from '@angular/core';

@Component({
  selector: 'fm-child-one',
  templateUrl: './fm-child-one.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FmChildOneComponent implements OnInit {

  @HostBinding('class')
  private _isCmp = 'fm-child-two widget';

  constructor() { }

  ngOnInit(): void {
  }

}
