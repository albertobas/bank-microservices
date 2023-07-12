import { join } from 'path';
import { getAllMethod, getByIdentifierMethod } from 'bank-utils/api/v1/methods/request';
import { getAllPath, getPath } from 'bank-utils/api/v1/paths/request';
import { type RequestInteractorResponse, type RequestsInteractorResponse } from 'bank-utils/api/v1/types';
import RequestRepository from '../core/repositories/request.repository';
import { fetchWrapper, validateRequestMethod } from 'src/features/shared/utils/helpers';
import { ClientsConfigV1 } from 'src/shared/utils/config';

const base = `http://localhost:${ClientsConfigV1.REQUESTS_PORT}`;

class RequestsDataSource implements RequestRepository {
  public async getAll(): Promise<RequestsInteractorResponse> {
    const response = await this.fetchWrapper(getAllPath, getAllMethod);
    return response.json();
  }

  public async getByIdentifier(identifier: number): Promise<RequestInteractorResponse> {
    const response = await this.fetchWrapper(join(getPath, identifier.toString()), getByIdentifierMethod);
    return response.json();
  }

  /**
   * Fetch wrapper.
   * @param path the path of the URL you want to conform.
   * @param method the request method.
   * @param body the body that you want to add to your request.
   * @returns a Promise that resolves to a `Response` object.
   */
  private async fetchWrapper(path: string, method: string, body?: any): Promise<Response> {
    const validatedMethod = validateRequestMethod(method);
    if (validatedMethod === null) {
      const message = 'Invalid request method';
      throw new Error(message);
    }
    const url = new URL(path, base).href;
    const bodyString = body ? JSON.stringify(body) : undefined;
    return await fetchWrapper(url, validatedMethod, bodyString);
  }
}

export default RequestsDataSource;
