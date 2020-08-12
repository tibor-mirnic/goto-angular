import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { environment } from '@environment';

// Modules
import { CoreUIModule } from '@modules/core-ui';
import { SharedModule } from '@modules/shared';
import { FeatureModuleModule } from '@modules/feature-module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,

    // Modules
    CoreUIModule,
    SharedModule,
    FeatureModuleModule.forRoot(environment.apiUrl),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
