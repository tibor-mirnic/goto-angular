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
import { OVERRIDE_TIMEOUT } from '../models/http-headers';

@Injectable()
export class HttpTimeoutInterceptor implements HttpInterceptor {

  constructor(
    @Inject(HTTP_ASYNC_CONFIG) private _httpConfig: IHttpAsyncConfig
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const overrideTimeoutHeader = request.headers.get(OVERRIDE_TIMEOUT);
    let timeoutOverride = Number.parseInt(overrideTimeoutHeader, 10);
    const cloned = request.clone({
      headers: request.headers.delete(OVERRIDE_TIMEOUT)
    });

    if (Number.isNaN(timeoutOverride)) {
      timeoutOverride = this._httpConfig.defaultTimeout;
    }

    return next
      .handle(cloned)
      .pipe(
        timeout(timeoutOverride)
      );
  }
}
