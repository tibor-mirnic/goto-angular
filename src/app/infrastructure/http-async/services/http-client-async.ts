import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';

import { ErrorBase, ErrorType } from '@modules/errors';

import { IHttpPostRequest, IHttpRequest } from '../models/request/http-request';
import { IRequestOptions } from '../models/request/request-options';
import { OVERRIDE_TIMEOUT, SKIP_AUTHORIZATION } from '../models/http-headers';
import { AuthenticationError } from '../models/errors/auth';

@Injectable({
  providedIn: 'root'
})
export class HttpClientAsync {

  constructor(
    private _httpClient: HttpClient
  ) { }

  handleError(
    error: ErrorBase,
    processError: (error: ErrorBase) => ErrorBase,
    checkAuthorization = false): ErrorBase {
    if (error.type === ErrorType.AUTHENTICATION
      || error.type === ErrorType.CONNECTION
      || error.type === ErrorType.CONFLICT) {
      return error;
    }

    if (error.type === ErrorType.AUTHORIZATION && checkAuthorization) {
      return new AuthenticationError();
    }

    if (error.type === ErrorType.REQUEST_TIMEOOUT) {
      const processedError = processError(error);
      processedError.message = `Requested operation timed out. Please, try again.`;

      return processedError;
    }

    return processError(error);
  }

  getContentDispositionFileName(response: HttpResponse<ArrayBuffer>): string {
    const header = response.headers.get('content-disposition');

    if (!header) {
      return '';
    }

    const regex = new RegExp(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/g);
    const matches = regex.exec(header);

    return (matches[1] || '').replace(/['"]/g, '');
  }

  downloadAsync(request: IHttpRequest): Promise<HttpResponse<ArrayBuffer>> {
    const reqOpts = this.getRequestOptions(request);
    return this._httpClient
      .get(request.resourcePath, {
        ...reqOpts,
        responseType: 'arraybuffer',
        observe: 'response'
      })
      .toPromise();
  }

  downloadImageAsync(request: IHttpRequest): Promise<HttpResponse<Blob>> {
    const reqOpts = this.getRequestOptions(request);
    return this._httpClient
      .get(request.resourcePath, {
        ...reqOpts,
        responseType: 'blob',
        observe: 'response'
      })
      .toPromise();
  }

  getAsync<T>(request: IHttpRequest): Promise<T> {
    const reqOpts = this.getRequestOptions(request);
    return this._httpClient
      .get<T>(request.resourcePath, reqOpts)
      .toPromise();
  }

  postAsync<T>(request: IHttpPostRequest): Promise<T> {
    const reqOpts = this.getRequestOptions(request);
    return this._httpClient
      .post<T>(request.resourcePath, request.body, reqOpts)
      .toPromise();
  }

  putAsync<T>(request: IHttpPostRequest): Promise<T> {
    const reqOpts = this.getRequestOptions(request);
    return this._httpClient
      .post<T>(request.resourcePath, request.body, reqOpts)
      .toPromise();
  }

  deleteAsync<T>(request: IHttpRequest): Promise<T> {
    const reqOpts = this.getRequestOptions(request);
    return this._httpClient
      .delete<T>(request.resourcePath, reqOpts)
      .toPromise();
  }

  private getRequestOptions(request: IHttpRequest): IRequestOptions {
    const headers = {};

    if (request.timeout) {
      headers[OVERRIDE_TIMEOUT] = request.timeout.toString();
    }

    if (request.skipAuthorization) {
      headers[SKIP_AUTHORIZATION] = 'true';
    }

    return {
      headers: new HttpHeaders(headers),
      params: new HttpParams({
        fromObject: request.queryParams
      }),
      withCredentials: true
    };
  }
}
