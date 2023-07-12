import { type AccountsInteractorResponse } from 'bank-utils/api/v1/types';
import { clientClosingErrorMessage, errorMessage } from 'bank-utils/api/v1/helpers';
import type AccountRepository from '../repositories/account.repository';

const getAllAccounts = (repository: AccountRepository) => async (): Promise<AccountsInteractorResponse> => {
  try {
    await repository.connect();
    const accounts = await repository.getAll();
    return {
      success: true,
      error: false,
      message: 'All accounts have been succesfully retrieved.',
      data: accounts.length > 0 ? accounts : null
    };
  } catch (error) {
    repository.log('error', error);
    if (error instanceof Error) {
      const { message } = error;
      return { success: false, error: true, message, data: null };
    } else {
      return { success: false, error: true, message: errorMessage, data: null };
    }
  } finally {
    try {
      await repository.close();
    } catch (error) {
      if (error instanceof Error) {
        repository.log('warn', error.stack ?? error.message);
      } else {
        repository.log('warn', clientClosingErrorMessage);
      }
    }
  }
};

export default getAllAccounts;
