import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnumDescriptionPipe } from './pipes/enum-description';

@NgModule({
  declarations: [EnumDescriptionPipe],
  exports: [EnumDescriptionPipe],
  imports: [
    CommonModule
  ]
})
export class CoreUIModule { }
