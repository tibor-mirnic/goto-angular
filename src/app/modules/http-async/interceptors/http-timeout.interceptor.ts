import { Inject, Injectable } from '@angular/core';

import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { timeout } from 'rxjs/operators';

import { HTTP_ASYNC_CONFIG } from '../models/tokens';
import { IHttpAsyncConfig } from '../models/http-async-config';
import { REQUEST_TIMEOUT } from '../models/http-headers';

@Injectable()
export class HttpTimeoutInterceptor implements HttpInterceptor {

  constructor(
    @Inject(HTTP_ASYNC_CONFIG) private _httpConfig: IHttpAsyncConfig
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const requestTimeoutHeader = request.headers.get(REQUEST_TIMEOUT);
    let requestTimeout = Number.parseInt(requestTimeoutHeader, 10);
    const cloned = request.clone({
      headers: request.headers.delete(REQUEST_TIMEOUT)
    });

    if (Number.isNaN(requestTimeout)) {
      requestTimeout = this._httpConfig.defaultTimeout;
    }

    return next
      .handle(cloned)
      .pipe(
        timeout(requestTimeout)
      );
  }
}
