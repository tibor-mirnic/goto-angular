import { Component, HostBinding, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';

import { FmComplexView } from './fm-complex.view';

@Component({
  selector: 'fm-complex',
  templateUrl: './fm-complex.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [FmComplexView]
})
export class FmComplexComponent {

  @HostBinding('class')
  private _baseClass = 'fm-complex cui-widget';

  constructor(
    public view: FmComplexView
  ) { }

  onChangeStatus(): void {
    this.view.changeStatus();
  }

  onDeleteItem(id: number): void {
    this.view.deleteItem(id);
  }
}
