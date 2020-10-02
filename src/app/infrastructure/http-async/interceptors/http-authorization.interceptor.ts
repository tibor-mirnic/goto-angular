import { Inject, Injectable } from '@angular/core';

import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';

import { from, Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

import { ErrorBase } from '@modules/errors';

import { HTTP_ASYNC_CONFIG } from '../models/tokens';
import { IHttpAsyncConfig } from '../models/http-async-config';
import { AUTHORIZATION, SKIP_AUTHORIZATION } from '../models/http-headers';
import { HttpClientAsync } from '../services/http-client-async';
import { AuthenticationError, ConnectionError } from '../models/errors/auth';

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
              headers: cloned.headers.set(AUTHORIZATION, `Bearer ${token}`)
            })
          )
        ),
        catchError((error: HttpErrorResponse) => {
          let message = null;

          if (error.error) {
            message = error.error.message;
          }

          if (!message) {
            message = error.message;
          }

          let er: ErrorBase = null;

          /*
            If you receive 400 status code that means that your
            refresh token has expired.
          */
          if (error.status === 400) {
            er = new AuthenticationError();
          }

          if (!er) {
            er = new ConnectionError();
          }

          return throwError(er);
        })
      );
  }
}
