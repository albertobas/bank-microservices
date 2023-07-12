import { type InteractorResponse } from 'bank-utils/api/v1/types';
import type LoanRepository from '../repositories/loan.repository';

const handleNotFound =
  (repository: LoanRepository) =>
  (method: string, path: string): InteractorResponse => {
    const message = `Not found. Method: ${method}. Path: ${path} .`;
    repository.log('error', message);
    return { success: false, error: true, message, data: null };
  };

export default handleNotFound;
