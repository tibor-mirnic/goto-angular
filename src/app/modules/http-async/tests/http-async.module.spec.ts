import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { of } from 'rxjs';

import { HttpAsyncModule } from '../http-async.module';
import { HttpClientAsync } from '../services/http-client-async';

describe('HttpAsyncModule', () => {
  let controller: HttpTestingController;
  let client: HttpClientAsync;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        HttpAsyncModule.forRoot({
          applicationId: 'test',
          defaultTimeout: 2 * 1000,
          accessTokenFactory: httpClient => {
            return of('accessToken');
          }
        })
      ],
      providers: [
        HttpClientAsync
      ]
    });

    controller = TestBed.inject(HttpTestingController);
    client = TestBed.inject(HttpClientAsync);
  });

  it('request should have default timeout', () => {
    client.getAsync({
      resourcePath: '/test/data',
      queryParams: {
        id: 'testId'
      }
    }).then(() => {});

    const test = controller.expectOne('/test/data?id=testId');
    expect(test.request.headers.get('Authorization')).toEqual('Bearer accessToken');
    expect(test.request.params.get('id')).toEqual('testId');
  });

  afterEach(() => {
    controller.verify();
  });
});
