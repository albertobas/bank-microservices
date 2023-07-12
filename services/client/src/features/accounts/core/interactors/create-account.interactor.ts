import { type Account } from 'bank-utils/api/v1/entities';
import { type InteractorResponse } from 'bank-utils/api/v1/types';
import { errorMessage } from 'bank-utils/api/v1/helpers';
import type AccountRepository from '../repositories/account.repository';

const createAccount =
  (repository: AccountRepository) =>
  async (account: Account): Promise<InteractorResponse> => {
    try {
      const response = await repository.create(account);
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

export default createAccount;
