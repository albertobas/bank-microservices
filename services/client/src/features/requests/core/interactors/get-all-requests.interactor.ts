import { errorMessage } from 'bank-utils/api/v1/helpers';
import { type RequestsInteractorResponse } from 'bank-utils/api/v1/types';
import type AccountRepository from '../repositories/request.repository';

const getAllAccounts = (repository: AccountRepository) => async (): Promise<RequestsInteractorResponse> => {
  try {
    const response = await repository.getAll();
    return response;
  } catch (error) {
    if (error instanceof Error) {
      const { message } = error;
      return { success: false, error: true, message, data: null };
    } else {
      return { success: false, error: true, message: errorMessage, data: null };
    }
  }
};

export default getAllAccounts;
