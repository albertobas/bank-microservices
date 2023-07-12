import { type Account } from 'bank-utils/api/v1/entities';
import {
  createMethod,
  deleteByNumberMethod,
  depositMethod,
  getAllMethod,
  getByNumberMethod,
  updateMethod,
  withdrawMethod
} from 'bank-utils/api/v1/methods/account';
import {
  createPath,
  deletePath,
  depositPath,
  getAllPath,
  getPath,
  updatePath,
  withdrawPath
} from 'bank-utils/api/v1/paths/account';
import {
  type InteractorResponse,
  type AccountInteractorResponse,
  type AccountsInteractorResponse
} from 'bank-utils/api/v1/types';
import AccountRepository from '../core/repositories/account.repository';
import { join } from 'path';
import { fetchWrapper, validateRequestMethod } from 'src/features/shared/utils/helpers';
import { ClientsConfigV1 } from 'src/shared/utils/config';

const base = `http://localhost:${ClientsConfigV1.ACCOUNTS_PORT}`;

class AccountsDataSource implements AccountRepository {
  public async create(account: Account): Promise<InteractorResponse> {
    const response = await this.fetchWrapper(createPath, createMethod, { account });
    return response.json();
  }

  public async deleteByNumber(number: number): Promise<InteractorResponse> {
    const response = await this.fetchWrapper(join(deletePath, number.toString()), deleteByNumberMethod);
    return response.json();
  }

  public async deposit(number: number, amount: number): Promise<InteractorResponse> {
    const response = await this.fetchWrapper(depositPath, depositMethod, { number, amount });
    return response.json();
  }
  public async getAll(): Promise<AccountsInteractorResponse> {
    const response = await this.fetchWrapper(getAllPath, getAllMethod);
    return response.json();
  }

  public async getByNumber(number: number): Promise<AccountInteractorResponse> {
    const response = await this.fetchWrapper(join(getPath, number.toString()), getByNumberMethod);
    return response.json();
  }

  public async update(account: Account): Promise<InteractorResponse> {
    const response = await this.fetchWrapper(updatePath, updateMethod, { account });
    return response.json();
  }

  public async withdraw(number: number, amount: number): Promise<InteractorResponse> {
    const response = await this.fetchWrapper(withdrawPath, withdrawMethod, { number, amount });
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

export default AccountsDataSource;
