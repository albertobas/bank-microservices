import { Account } from 'bank-utils/api/v1/entities';
import { errorMessage } from 'bank-utils/api/v1/helpers';
import { type InteractorResponse } from 'bank-utils/api/v1/types';
import type AccountRepository from '../repositories/account.repository';

const updateAccount =
  (repository: AccountRepository) =>
  async (account: Account): Promise<InteractorResponse> => {
    try {
      const response = await repository.update(account);
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

export default updateAccount;
