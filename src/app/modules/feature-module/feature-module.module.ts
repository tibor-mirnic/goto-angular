import { NgModule, Optional, SkipSelf, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CoreUIModule } from '@modules/core-ui';
import { FeatureModuleRoutingModule } from './feature-module-routing.module';
import { FEATURE_MODULE_API_URL } from './models/tokens';
import { FmSimpleComponent } from './components/fm-simple/fm-simple.component';
import { FmComplexComponent } from './components/fm-complex/fm-complex.component';
import { FmParentComponent } from './components/fm-parent/fm-parent.component';
import { FmChildOneComponent } from './components/fm-parent/fm-child-one/fm-child-one.component';
import { FmChildTwoComponent } from './components/fm-parent/fm-child-two/fm-child-two.component';

@NgModule({
  declarations: [FmSimpleComponent, FmComplexComponent, FmParentComponent, FmChildOneComponent, FmChildTwoComponent],
  exports: [FmSimpleComponent, FmComplexComponent, FmParentComponent],
  imports: [
    CommonModule,
    FormsModule,

    CoreUIModule,

    FeatureModuleRoutingModule
  ]
})
export class FeatureModuleModule {

  constructor(
    @Optional() @SkipSelf() module: FeatureModuleModule
  ) {
    if (module) {
      throw new Error('FeatureModule has already been loaded.');
    }
  }

  static forRoot(apiUrl: string): ModuleWithProviders<FeatureModuleModule> {
    return {
      ngModule: FeatureModuleModule,
      providers: [{
        provide: FEATURE_MODULE_API_URL,
        useValue: apiUrl
      }]
    };
  }
}
