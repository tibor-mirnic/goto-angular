import { Injectable } from '@angular/core';

import { DropdownEnum } from '@modules/core-ui';

import { ComplexModelService } from '../../services/complex-model.service';
import { IComplexModel } from '../../models/components/complex-model';
import { ComplexModelStatus } from '../../models/enums/complex-model-status';
import { ComplexModelStatusDescription } from '../../models/enums/complex-model-status';

@Injectable()
export class FmComplexView {

  model: IComplexModel;

  complexModelStatusDropdown: DropdownEnum;
  complexModelStatusDescription = ComplexModelStatusDescription;

  constructor(
    private _service: ComplexModelService
  ) {
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

  async loadModel(): Promise<void> {
    try {
      const response = await this._service.getComplexModel({
        status: ComplexModelStatus.ACTIVE
      });

      this.model = response.model;
    }
    catch (error) {
      throw error;
    }
  }

  changeStatus(): void {
    let newStatus: ComplexModelStatus = ComplexModelStatus.ACTIVE;
    if (this.model.status === ComplexModelStatus.ACTIVE) {
      newStatus = ComplexModelStatus.INACTIVE;
    }

    this.model.status = newStatus;
  }

  deleteItem(id: number): void {
    this.model.items = this.model.items.filter(a => a.id !== id);
  }
}
