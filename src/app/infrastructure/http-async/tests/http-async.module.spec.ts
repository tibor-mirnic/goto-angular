import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { HttpAsyncModule } from '../http-async.module';
import { HttpClientAsync } from '../services/http-client-async.service';

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
          accessTokenFactory: async httpClientAsync => {
            try {
              await new Promise(resolve => {
                setTimeout(() => resolve('accessToken'), 200);
              });
              const token: string = await httpClientAsync
                .getAsync({
                  resourcePath: '/api/token/refresh',
                  queryParams: {
                    refreshToken: 'refreshToken'
                  },
                  skipAuthorization: true
                });

              return token;
            }
            catch (error) {
              throw error;
            }
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

  it('request should be authorized', fakeAsync(() => {
    client.getAsync({
      resourcePath: '/api/test/data',
      queryParams: {
        id: 'testId'
      }
    });

    tick(200);

    const refresh = controller.expectOne('/api/token/refresh?refreshToken=refreshToken');
    expect(refresh.request.headers.get('Authorization')).toBeNull();
    expect(refresh.request.params.get('refreshToken')).toEqual('refreshToken');
    refresh.flush('refreshToken');

    tick();

    const test = controller.expectOne('/api/test/data?id=testId');
    expect(test.request.headers.get('Authorization')).toEqual('Bearer refreshToken');
    expect(test.request.params.get('id')).toEqual('testId');
    test.flush({});
  }));

  afterEach(() => {
    controller.verify();
  });
});
