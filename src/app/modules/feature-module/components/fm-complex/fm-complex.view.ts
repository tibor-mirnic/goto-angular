import { Injectable } from '@angular/core';
import { IComplexModel } from '../../models/complex-model';
import { ComplexModelStatus } from '@modules/feature-module/models/enums/complex-model-status';

import { ComplexModelStatusDescription } from '../../models/enums/complex-model-status';
import { DropdownEnum } from '@modules/core-ui';

@Injectable()
export class FmComplexView {

  model: IComplexModel;

  complexModelStatusDropdown: DropdownEnum;
  complexModelStatusDescription = ComplexModelStatusDescription;

  constructor() {
    this.model = {
      name: 'Complex Model',
      description: 'Model that cannot be directly mapped to HTML template',
      status: ComplexModelStatus.ACTIVE,
      items: Array.from({ length: 10 })
        .map((a, i) => ({
          id: i,
          name: `Item ${++i}`,
          description: `Some description`}))
    };

    this.complexModelStatusDropdown = new DropdownEnum(ComplexModelStatusDescription);
  }

  public changeStatus(): void {
    let newStatus: ComplexModelStatus = ComplexModelStatus.ACTIVE;
    if (this.model.status === ComplexModelStatus.ACTIVE) {
      newStatus = ComplexModelStatus.INACTIVE;
    }

    this.model.status = newStatus;
  }

  public deleteItem(id: number): void {
    this.model.items = this.model.items.filter(a => a.id !== id);
  }
}
