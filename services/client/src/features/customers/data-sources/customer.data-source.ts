import { type Customer } from 'bank-utils/api/v1/entities';
import {
  createMethod,
  deleteByIdentifierMethod,
  getAllMethod,
  getByIdentifierMethod,
  updateMethod
} from 'bank-utils/api/v1/methods/customer';
import { createPath, deletePath, getAllPath, getPath, updatePath } from 'bank-utils/api/v1/paths/customer';
import {
  type InteractorResponse,
  type CustomerInteractorResponse,
  type CustomersInteractorResponse
} from 'bank-utils/api/v1/types';
import CustomerRepository from '../core/repositories/customer.repository';
import { join } from 'path';
import { fetchWrapper, validateRequestMethod } from 'src/features/shared/utils/helpers';
import { ClientsConfigV1 } from 'src/shared/utils/config';

const base = `http://localhost:${ClientsConfigV1.CUSTOMERS_PORT}`;

class CustomersDataSource implements CustomerRepository {
  public async create(customer: Customer): Promise<InteractorResponse> {
    const response = await this.fetchWrapper(createPath, createMethod, { customer });
    return response.json();
  }

  public async deleteByIdentifier(identifier: number): Promise<InteractorResponse> {
    const response = await this.fetchWrapper(join(deletePath, identifier.toString()), deleteByIdentifierMethod);
    return response.json();
  }

  public async getAll(): Promise<CustomersInteractorResponse> {
    const response = await this.fetchWrapper(getAllPath, getAllMethod);
    return response.json();
  }

  public async getByIdentifier(identifier: number): Promise<CustomerInteractorResponse> {
    const response = await this.fetchWrapper(join(getPath, identifier.toString()), getByIdentifierMethod);
    return response.json();
  }

  public async update(customer: Customer): Promise<InteractorResponse> {
    const response = await this.fetchWrapper(updatePath, updateMethod, { customer });
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
    return fetchWrapper(url, validatedMethod, bodyString);
  }
}

export default CustomersDataSource;
