import { type AccountsInteractorResponse } from 'bank-utils/api/v1/types';
import { errorMessage } from 'bank-utils/api/v1/helpers';
import type AccountRepository from '../repositories/account.repository';

const getAllAccounts = (repository: AccountRepository) => async (): Promise<AccountsInteractorResponse> => {
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
