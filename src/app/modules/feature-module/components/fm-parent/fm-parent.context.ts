import { Injectable } from '@angular/core';

import { Context, timeout } from '@modules/core-ui';

import { IFmParentModel } from '../../models/components/fm-parent';
import { FmParentContextEvent } from '../../models/enums/fm-parent/fm-parent-context-event';
import { FmParentContextCommand } from '../../models/enums/fm-parent/fm-parent-context-command';

@Injectable()
export class FmParentContext extends Context<IFmParentModel, FmParentContextEvent, FmParentContextCommand> {

  async getModel(): Promise<IFmParentModel> {
    try {

      await timeout(1000);

      const m: IFmParentModel = {
        name: 'Parent Model',
        childOne: {
          name: 'First Child'
        },
        childTwo: {
          name: 'Second Child'
        }
      };

      return m;
    }
    catch (error) {
      throw error;
    }
  }

  updateChildOne(): void {
    this.updateModel(
      FmParentContextEvent.CHILD_ONE_UPDATED,
      model => ({
        ...model,
        childOne: {
          ...model.childOne,
          name: 'Updated First Child Name'
        }
      })
    );
  }

  updateChildTwo(name: string): void {
    this.updateModel(
      FmParentContextEvent.CHILD_TWO_UPDATED,
      model => ({
        ...model,
        childTwo: {
          ...model.childTwo,
          name
        }
      })
    );
  }

  refreshChildTwo(): void {
    this.executeCommand(FmParentContextCommand.REFRESH_CHILD_TWO);
  }
}
