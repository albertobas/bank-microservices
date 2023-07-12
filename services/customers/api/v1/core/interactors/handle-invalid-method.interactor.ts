import { type InteractorResponse } from 'bank-utils/api/v1/types';
import type CustomerRepository from '../repositories/customer.repository';

const handleInvalidMethod =
  (repository: CustomerRepository) =>
  (method: string, path: string): InteractorResponse => {
    const message = `Invalid method. Method: ${method}. Path: ${path} .`;
    repository.log('error', message);
    return { success: false, error: true, message, data: null };
  };

export default handleInvalidMethod;
