import { Inject, Injectable } from '@angular/core';

import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpHeaders
} from '@angular/common/http';

import { Observable, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { HTTP_ASYNC_CONFIG } from '../models/tokens';
import { IHttpAsyncConfig } from '../models/http-async-config';
import { ACCESS_TOKEN_REFRESHING, SKIP_AUTHORIZATION } from '../models/http-headers';

@Injectable()
export class HttpAuthorizationInterceptor implements HttpInterceptor {

  constructor(
    @Inject(HTTP_ASYNC_CONFIG) private _httpConfig: IHttpAsyncConfig
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    let isUnauthorized = false;
    const xRequestUnauthorizedHeader = request.headers.get(SKIP_AUTHORIZATION);

    if (xRequestUnauthorizedHeader) {
      isUnauthorized = xRequestUnauthorizedHeader === 'true';
      request = request.clone({
        headers: request.headers.delete(SKIP_AUTHORIZATION)
      });
    }

    if (isUnauthorized) {
      return next
        .handle(request);
    }

    return from(this._httpConfig.accessTokenFactory)
      .pipe(
        switchMap(token =>
          next.handle(
            request.clone({
              headers: new HttpHeaders({
                ...request.headers,
                ['Authorization']: `Bearer ${token}`,
                [ACCESS_TOKEN_REFRESHING]: 'true'
              })
            })
          )
        )
      );
  }
}
