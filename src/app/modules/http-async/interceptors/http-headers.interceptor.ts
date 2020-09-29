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

    const headers = {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      ['Pragma']: 'no-cache',
      ['Expires']: '-1',
      [X_APPLICATION_ID]: this._httpConfig.applicationId,
      [X_REQUEST_ID]: v4()
    };

    request = request.clone({
      headers: new HttpHeaders({
        ...request.headers,
        ...headers
      })
    });

    return next
      .handle(request);
  }
}
