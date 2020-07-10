import { Component, OnInit, HostBinding, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'fm-child-two',
  templateUrl: './fm-child-two.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FmChildTwoComponent implements OnInit {

  @HostBinding('class')
  private _isCmp = 'fm-child-two widget';

  constructor() { }

  ngOnInit(): void {
  }

}
