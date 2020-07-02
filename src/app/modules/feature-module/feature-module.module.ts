import { NgModule, Optional, SkipSelf, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeatureModuleRoutingModule } from './feature-module-routing.module';
import { FEATURE_MODULE_API_URL } from './models/tokens';
import { FmSimpleComponent } from './components/fm-simple/fm-simple.component';

@NgModule({
  declarations: [FmSimpleComponent],
  exports: [FmSimpleComponent],
  imports: [
    CommonModule,
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

  public static forRoot(apiUrl: string): ModuleWithProviders<FeatureModuleModule> {
    return {
      ngModule: FeatureModuleModule,
      providers: [{
        provide: FEATURE_MODULE_API_URL,
        useValue: apiUrl
      }]
    };
  }
}
