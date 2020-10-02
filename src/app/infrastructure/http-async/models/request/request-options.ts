import { HttpHeaders, HttpParams } from '@angular/common/http';

export interface IRequestOptions {
  headers: HttpHeaders;
  params: HttpParams;
  withCredentials: boolean;
}
