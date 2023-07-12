import { join } from 'path';
import { type Loan } from 'bank-utils/api/v1/entities';
import {
  createMethod,
  deleteByIdentifierMethod,
  getAllMethod,
  getByIdentifierMethod,
  updateMethod
} from 'bank-utils/api/v1/methods/loan';
import { createPath, deletePath, getAllPath, getPath, updatePath } from 'bank-utils/api/v1/paths/loan';
import {
  type InteractorResponse,
  type LoanInteractorResponse,
  type LoansInteractorResponse
} from 'bank-utils/api/v1/types';
import LoanRepository from '../core/repositories/loan.repository';
import { fetchWrapper, validateRequestMethod } from 'src/features/shared/utils/helpers';
import { ClientsConfigV1 } from 'src/shared/utils/config';
import { LoanDefault } from 'src/features/shared/types';

const loanBase = `http://localhost:${ClientsConfigV1.LOANS_PORT}`;
const loanModelBase = 'http://localhost:5000';

class LoansDataSource implements LoanRepository {
  public async create(loan: Loan): Promise<InteractorResponse> {
    const response = await this.fetchWrapper(createPath, createMethod, { loan });
    return response.json();
  }

  public async deleteByIdentifier(identifier: number): Promise<InteractorResponse> {
    const response = await this.fetchWrapper(join(deletePath, identifier.toString()), deleteByIdentifierMethod);
    return response.json();
  }

  public async getAll(): Promise<LoansInteractorResponse> {
    const response = await this.fetchWrapper(getAllPath, getAllMethod);
    return response.json();
  }

  public async getByIdentifier(identifier: number): Promise<LoanInteractorResponse> {
    const response = await this.fetchWrapper(join(getPath, identifier.toString()), getByIdentifierMethod);
    return response.json();
  }

  public async requestPrediction(loanDefault: LoanDefault): Promise<number> {
    const { creditPolicy, ...rest } = loanDefault;
    const response = await this.fetchWrapper(
      'predict',
      'post',
      { creditPolicy: creditPolicy === true ? 1 : 0, ...rest },
      true
    );
    return response.json();
  }

  public async update(loan: Loan): Promise<InteractorResponse> {
    const response = await this.fetchWrapper(updatePath, updateMethod, { loan });
    return response.json();
  }

  /**
   * Fetch wrapper.
   * @param path the path of the URL you want to conform.
   * @param method the request method.
   * @param body the body that you want to add to your request.
   * @returns a Promise that resolves to a `Response` object.
   */
  private async fetchWrapper(path: string, method: string, body?: any, isModel?: boolean): Promise<Response> {
    const validatedMethod = validateRequestMethod(method);
    if (validatedMethod === null) {
      const message = 'Invalid request method';
      throw new Error(message);
    }
    const url = new URL(path, isModel ? loanModelBase : loanBase).href;
    const bodyString = body ? JSON.stringify(body) : undefined;
    return fetchWrapper(url, validatedMethod, bodyString, isModel ? 'cors' : undefined);
  }
}

export default LoansDataSource;
