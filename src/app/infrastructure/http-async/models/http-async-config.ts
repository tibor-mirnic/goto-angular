import { HttpClientAsync } from '../services/http-client-async.service';

export interface IHttpAsyncConfig {
  applicationId: string;
  defaultTimeout: number;
  accessTokenFactory: (httpClientAsync: HttpClientAsync) => Promise<string>;
}
