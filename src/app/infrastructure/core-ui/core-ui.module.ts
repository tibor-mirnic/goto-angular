import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { EnumDescriptionPipe } from './pipes/enum-description';
import { RunEventsOutsideAngularDirective } from './directives/run-events-outside-angular.directive';
import { CuiTextBoxComponent } from './components/forms/cui-text-box/cui-text-box.component';

@NgModule({
  declarations: [EnumDescriptionPipe, RunEventsOutsideAngularDirective, CuiTextBoxComponent],
  exports: [EnumDescriptionPipe, CuiTextBoxComponent],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class CoreUIModule { }
