import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnumDescriptionPipe } from './pipes/enum-description';
import { RunEventsOutsideAngularDirective } from './directives/run-events-outside-angular.directive';

@NgModule({
  declarations: [EnumDescriptionPipe, RunEventsOutsideAngularDirective],
  exports: [EnumDescriptionPipe],
  imports: [
    CommonModule
  ]
})
export class CoreUIModule { }
