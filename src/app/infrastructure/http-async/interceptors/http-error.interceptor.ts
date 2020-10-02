import { Injectable } from '@angular/core';

import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ErrorBase, ApplicationError } from '@modules/errors';

import { AuthorizationError, ConnectionError } from '../models/errors/auth';
import { BadRequestError } from '../models/errors/bad-request';
import { ConflictError } from '../models/errors/conflict';
import { ForbiddenError } from '../models/errors/forbidden';
import { InternalServerError } from '../models/errors/internal-server';
import { NotFoundError } from '../models/errors/not-found';
import { RequestTimeoutError, GatewayTimeoutError } from '../models/errors/request-timeout';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next
      .handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let message = null;

          if (error.error) {
            message = error.error.message;
          }

          if (!message) {
            message = error.message;
          }

          let er: ErrorBase = null;

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

          if (error.status === 504) {
            er = new GatewayTimeoutError(message);
          }

          if (!er) {
            er = new ApplicationError(error.message);
          }

          return throwError(er);
        })
      );
  }
}
