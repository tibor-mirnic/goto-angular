import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { environment } from '@environment';

// Modules
import { ErrorsModule } from '@modules/errors';
import { HttpAsyncModule } from '@modules/http-async';
import { CoreUIModule } from '@modules/core-ui';
import { SharedModule } from '@modules/shared';
import { FeatureModuleModule } from '@modules/feature-module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,

    // Modules
    ErrorsModule.forRoot(),
    HttpAsyncModule.forRoot({
      applicationId: 'goto-angular',
      defaultTimeout: 5 * 1000,
      accessTokenFactory: async httpClientAsync => {
        try {
          await new Promise(resolve => {
            setTimeout(() => resolve('accessToken'), 200);
          });
          const token: string = await httpClientAsync
            .getAsync({
              resourcePath: '/api/token/refresh',
              queryParams: {
                refreshToken: 'refreshToken'
              },
              skipAuthorization: true
            });

          return token;
        }
        catch (error) {
          throw error;
        }
      }
    }),
    CoreUIModule,
    SharedModule,
    FeatureModuleModule.forRoot(environment.apiUrl),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
