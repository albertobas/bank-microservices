import { type InteractorResponse } from 'bank-utils/api/v1/types';
import type AccountRepository from '../repositories/account.repository';

const handleInvalidMethod =
  (repository: AccountRepository) =>
  (method: string, path: string): InteractorResponse => {
    const message = `Invalid method. Method: ${method}. Path: ${path} .`;
    repository.log('error', message);
    return { success: false, error: true, message, data: null };
  };

export default handleInvalidMethod;
