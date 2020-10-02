## Infrastructure

Here we define techical modules.

Modules defined here can be used in any of the feature modules.

All technical modules should be imported in the root `App` module.

As for `core-ui` it can be imported also in the `feature` modules because it contains components, directives and other ui related things.

```
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
```