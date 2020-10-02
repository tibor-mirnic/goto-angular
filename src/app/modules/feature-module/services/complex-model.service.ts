import { Inject, Injectable } from '@angular/core';

import { HttpClientAsync } from '@modules/http-async';
import { FeatureModuleError } from '../models/errors';

import { IGetComplexModelRequest } from '../models/request/get-complex-model';
import { IGetComplexModelResponse } from '../models/response/get-complex-model';
import { FEATURE_MODULE_API_URL } from '../models/tokens';

@Injectable({
  providedIn: 'root'
})
export class ComplexModelService {

  private _basePath: string;

  constructor(
    private _httpClientAsync: HttpClientAsync,
    @Inject(FEATURE_MODULE_API_URL) apiUrl: string
  ) {
    this._basePath = `${apiUrl}/complexModel`;
  }

  async getComplexModel(request: IGetComplexModelRequest): Promise<IGetComplexModelResponse> {
    try {
      const response = await this._httpClientAsync
        .getAsync<IGetComplexModelResponse>({
          resourcePath: this._basePath
        });

      return response;
    }
    catch (error) {
      throw this._httpClientAsync.handleError(error, er => new FeatureModuleError(er.message));
    }
  }
}
