## Http Async

Here we have defined the [HttpClientAsync](https://github.com/tibor-mirnic/goto-angular/blob/master/src/app/infrastructure/http-async/services/http-client-async.ts) service which is a wrapper for `HttpClient`. It is a service that is provided in the `root` module.

Wrapping `HttpClient` to use `Promise` like api is done because all `HTTP` requests are syncronous, the `Observable` will emit only one element and will immediately complete, therefore this is a perfect candidate for a `Promise`. Also, you can use `async/await` syntax in your code.

```
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
})
```

## IHttpAsyncConfig

To use this module you need to provide an `default` configuration. You can do that using `forRoot` static method.

```
export interface IHttpAsyncConfig {
  applicationId: string;
  defaultTimeout: number;
  accessTokenFactory: (httpClientAsync: HttpClientAsync) => Promise<string>;
}
```

## Methods

Each method receives an `IHttpRequest` object as an parameter.

```
export interface IHttpRequest {
  resourcePath: string;
  queryParams?: IQueryParams;
  skipAuthorization?: boolean;
  timeout?: number;
}
```

Apart from `HTTP` methods, there are also `handleError`, `downloadAsync`, `downloadImage` and `getContentDispositionFileName` which extracts file name.

#### handleError

This is a helper method that enables you to convert any `Error` that is thrown by the `HttpClientAsync` to something more user friendly.

## Interceptors

Interceptors are a great way for intercepting any `HTTP` request. It is important to remember that interceptors are invoken in order that they are provide.
We have defined these inteceptors

#### HttpHeadersInterceptor

This sets default headers, like `Content-Type`, `Cache-Control` etc.

#### HttpTimeoutInterceptor

This sets default `timeout` to all `HTTP` request. Default value is defined in the `IHttpAsyncConfig`.

Timeout can be overriden for each request by providing `timeout` in the `IHttpRequest`.

#### HttpAuthorizationInterceptor

By default all request require authorization. This can be overriden for each request by setting `skipAuthorization` to `true`.

When an `HTTP` request is made, interceptor will make a call to the `accessTokenFactory` and if the factory throws an error, either your token has exired or you have a connection problem, it will stop the request.

On the other hand, if you get the token from the factory it will add the `Authorization` header with token and continue with the request.

#### HttpErrorInterceptor

This the last interceptor. It will process `HttpErrorResponse`, if there is one, and throw an error based on the respose status code.
