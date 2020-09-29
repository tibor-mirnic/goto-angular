import { IQueryParams } from '../query-params';

export interface IHttpRequest {
  resourcePath: string;
  queryParams?: IQueryParams;
  unauthorized?: boolean;
  timeout?: number;
}

export interface IHttpPostRequest extends IHttpRequest {
  body?: IQueryParams;
}
