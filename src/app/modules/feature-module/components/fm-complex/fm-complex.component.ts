import { Component, HostBinding, ViewEncapsulation, ChangeDetectionStrategy, OnInit, ChangeDetectorRef } from '@angular/core';

import { ErrorService } from '@modules/errors';

import { FmComplexView } from './fm-complex.view';

@Component({
  selector: 'fm-complex',
  templateUrl: './fm-complex.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [FmComplexView]
})
export class FmComplexComponent implements OnInit {

  @HostBinding('class')
  private _baseClass = 'fm-complex cui-widget';

  isLoading: boolean;

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _errorService: ErrorService,
    public view: FmComplexView
  ) {
    this.isLoading = false;
  }

  ngOnInit(): void {
    this.loadModel();
  }

  onChangeStatus(): void {
    this.view.changeStatus();
  }

  onDeleteItem(id: number): void {
    this.view.deleteItem(id);
  }

  private async loadModel(): Promise<void> {
    try {
      this.setLoadingState(true);

      await this.view.loadModel();
    }
    catch (error) {
      this._errorService.handleError(error);
    }
    finally {
      this.setLoadingState(false);
    }
  }

  private setLoadingState(isLoading: boolean): void {
    this.isLoading = isLoading;
    this._changeDetectorRef.detectChanges();
  }
}
