import { Inject, Injectable } from '@angular/core';

import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpClient
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { HTTP_ASYNC_CONFIG } from '../models/tokens';
import { IHttpAsyncConfig } from '../models/http-async-config';
import { ACCESS_TOKEN_REFRESHING, SKIP_AUTHORIZATION } from '../models/http-headers';

@Injectable()
export class HttpAuthorizationInterceptor implements HttpInterceptor {

  constructor(
    private _httpClient: HttpClient,
    @Inject(HTTP_ASYNC_CONFIG) private _httpConfig: IHttpAsyncConfig
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const skipAuthorizationHeader = request.headers.get(SKIP_AUTHORIZATION);
    const isUnauthorized = skipAuthorizationHeader === 'true';
    const cloned = request.clone({
      headers: request.headers.delete(SKIP_AUTHORIZATION)
    });


    if (isUnauthorized) {
      return next
        .handle(cloned);
    }

    return this._httpConfig.accessTokenFactory(this._httpClient)
      .pipe(
        switchMap(token =>
          next.handle(
            cloned.clone({
              headers: cloned.headers
                .set('Authorization', `Bearer ${token}`)
                .set(ACCESS_TOKEN_REFRESHING, 'true')
            })
          )
        )
      );
  }
}
