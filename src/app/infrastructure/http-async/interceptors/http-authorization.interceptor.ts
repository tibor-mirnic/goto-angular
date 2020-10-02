import { Inject, Injectable } from '@angular/core';

import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';

import { from, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { HTTP_ASYNC_CONFIG } from '../models/tokens';
import { IHttpAsyncConfig } from '../models/http-async-config';
import { REFRESH_ACCESS_TOKEN, SKIP_AUTHORIZATION } from '../models/http-headers';
import { HttpClientAsync } from '../services/http-client-async';

@Injectable()
export class HttpAuthorizationInterceptor implements HttpInterceptor {

  constructor(
    private _httpClientAsync: HttpClientAsync,
    @Inject(HTTP_ASYNC_CONFIG) private _httpConfig: IHttpAsyncConfig
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const skipAuthorizationHeader = request.headers.get(SKIP_AUTHORIZATION);
    const skipAuthorization = skipAuthorizationHeader === 'true';
    const cloned = request.clone({
      headers: request.headers.delete(SKIP_AUTHORIZATION)
    });


    if (skipAuthorization) {
      return next
        .handle(cloned);
    }

    return from(this._httpConfig.accessTokenFactory(this._httpClientAsync))
      .pipe(
        switchMap(token =>
          next.handle(
            cloned.clone({
              headers: cloned.headers
                .set('Authorization', `Bearer ${token}`)
                .set(REFRESH_ACCESS_TOKEN, 'true')
            })
          )
        )
      );
  }
}
