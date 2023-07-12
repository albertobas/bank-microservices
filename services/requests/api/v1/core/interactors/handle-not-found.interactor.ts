import { type InteractorResponse } from 'bank-utils/api/v1/types';
import type RequestRepository from '../repositories/request.repository';

const handleNotFound =
  (repository: RequestRepository) =>
  (method: string, path: string): InteractorResponse => {
    const message = `Not found. Method: ${method}. Path: ${path} .`;
    repository.log('error', message);
    return { success: false, error: true, message, data: null };
  };

export default handleNotFound;