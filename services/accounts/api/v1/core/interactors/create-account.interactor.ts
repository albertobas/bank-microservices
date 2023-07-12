import type AccountRepository from '../repositories/account.repository';
import { type Account } from 'bank-utils/api/v1/entities/account';
import { type InteractorResponse } from 'bank-utils/api/v1/types';
import { clientClosingErrorMessage, errorMessage } from 'bank-utils/api/v1/helpers';

const createAccount =
  (repository: AccountRepository) =>
  async (account: Account): Promise<InteractorResponse> => {
    try {
      await repository.connect();
      await repository.create(account);
      return { success: true, error: false, message: 'An account has been succesfully created.', data: null };
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

export default createAccount;
