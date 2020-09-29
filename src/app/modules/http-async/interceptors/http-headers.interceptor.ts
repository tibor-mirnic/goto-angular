import { Inject, Injectable } from '@angular/core';

import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpHeaders
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { v4 } from 'uuid';

import { HTTP_ASYNC_CONFIG } from '../models/tokens';
import { IHttpAsyncConfig } from '../models/http-async-config';
import { X_APPLICATION_ID, X_REQUEST_ID } from '../models/http-headers';

@Injectable()
export class HttpHeadersInterceptor implements HttpInterceptor {

  constructor(
    @Inject(HTTP_ASYNC_CONFIG) private _httpConfig: IHttpAsyncConfig
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const cloned = request.clone({
      headers: request.headers
        .set('Content-Type', 'application/json')
        .set('Cache-Control', 'no-cache')
        .set('Pragma', 'no-cache')
        .set('Expires', '-1')
        .set(X_APPLICATION_ID, this._httpConfig.applicationId)
        .set(X_REQUEST_ID, v4())
    });

    return next
      .handle(cloned);
  }
}
