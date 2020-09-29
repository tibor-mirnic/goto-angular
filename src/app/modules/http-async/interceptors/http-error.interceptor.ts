import { Injectable } from '@angular/core';

import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ACCESS_TOKEN_REFRESHING } from '../models/http-headers';
import { ErrorBase } from '../models/errors/base';
import { AuthenticationError, AuthorizationError, ConnectionError } from '../models/errors/auth';
import { BadRequestError } from '../models/errors/user-friendly';
import { InternalServerError, ApplicationError } from '../models/errors/application';
import { ConflictError } from '../models/errors/conflict';
import { ForbiddenError } from '../models/errors/forbidden';
import { NotFoundError } from '../models/errors/not-found';
import { RequestTimeoutError } from '../models/errors/request-timeout';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let isAccessTokenRefreshing = false;
    const accessTokenRefreshingHeader = request.headers.get(ACCESS_TOKEN_REFRESHING);

    if (accessTokenRefreshingHeader) {
      isAccessTokenRefreshing = accessTokenRefreshingHeader === 'true';
      request = request.clone({
        headers: request.headers.delete(ACCESS_TOKEN_REFRESHING)
      });
    }

    return next
      .handle(request)
      .pipe(
        catchError(error => {
          let message = null;
          let er: ErrorBase = null;

          if (error.error) {
            message = error.error.message;
          }

          if (!message) {
            message = error.message;
          }

          if (isAccessTokenRefreshing) {
            er = error.status === 401 ? new AuthenticationError() : new ConnectionError();
            return throwError(er);
          }

          if (error.status === 400) {
            er = new BadRequestError(message);
          }

          if (error.status === 401) {
            er = new AuthorizationError(message);
          }

          if (error.status === 403) {
            er = new ForbiddenError(message);
          }

          if (error.status === 404) {
            er = new NotFoundError(message);
          }

          if (error.status === 408
            || error.name.toLowerCase() === 'TimeoutError'.toLowerCase()) {
            er = new RequestTimeoutError(message);
          }

          if (error.status === 409) {
            er = new ConflictError(message);
          }

          if (error.status === 500) {
            er = new InternalServerError(message);
          }

          if (error.status === 503) {
            er = new ConnectionError(message);
          }

          er = new ApplicationError(error.message);

          return throwError(er);
        })
      );
  }
}
