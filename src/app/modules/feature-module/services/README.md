## Services

Contains all services that comunicate with an `API` that is responsible for an module. Services are provided in the `root` module.

There should be as many `service` classes as `API` controllers. So, for `api/users`, which is a `Users` controller on a beckend, you will have a `UsersService`.

A service is responsible for mapping data from and to an `API`. An example would be the dates, you would convert them from `UTC string` to `Date` in the response, and from `Date` to `UTC string` in the request.

```
@Injectable({
  providedIn: 'root'
})
export class ComplexModelService {

  private _basePath: string;

  constructor(
    private _httpClientAsync: HttpClientAsync,
    @Inject(FEATURE_MODULE_API_URL) apiUrl: string
  ) {
    this._basePath = `${apiUrl}/complexModel`;
  }
}
```

## Methods

All methods that call an `API` should be `async`, with `try/catch` block.

Use `request/response` pattern for an consistent `API`, as mentioned in [Models](https://github.com/tibor-mirnic/goto-angular/blob/master/src/app/modules/feature-module/models/README.md#requestresponse). 

```
async getComplexModel(request: IGetComplexModelRequest): Promise<IGetComplexModelResponse> {
  try {
    const response = await this._httpClientAsync
      .getAsync<IGetComplexModelResponse>({
        resourcePath: this._basePath
      });

    return response;
  }
  catch (error) {
    throw this._httpClientAsync.handleError(error, er => new FeatureModuleError(er.message));
  }
}
```

In the code snippet above you can see that in instead of just throwing an error to caller we have converted the error to `FeatureModuleError` that is more user friendly.

## Example

A portion of the `view` file

```
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
```

A portion of the `component` file
```
private async loadModel(): Promise<void> {
  try {
    this.setLoadingState(true);

    await this.view.loadModel();
  }
  catch (error) {
    this._errorService.handleError(error);
  }
  finally {
    this.setLoadingState(false);
  }
}

private setLoadingState(isLoading: boolean): void {
  this.isLoading = isLoading;
  this._changeDetectorRef.detectChanges();
}
```

In the `component` code snippet you can see that we use `ErrorService` to decide how to present the error the user.