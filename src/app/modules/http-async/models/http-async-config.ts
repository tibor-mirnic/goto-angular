import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface IHttpAsyncConfig {
  applicationId: string;
  defaultTimeout: number;
  accessTokenFactory: (httpClient: HttpClient) => Observable<string>;
}
