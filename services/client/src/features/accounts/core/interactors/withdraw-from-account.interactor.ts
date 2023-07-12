import { type InteractorResponse } from 'bank-utils/api/v1/types';
import { errorMessage } from 'bank-utils/api/v1/helpers';
import type AccountRepository from '../repositories/account.repository';

const withdrawFromAccount =
  (repository: AccountRepository) =>
  async (number: number, amount: number): Promise<InteractorResponse> => {
    try {
      const response = await repository.withdraw(number, amount);
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

export default withdrawFromAccount;
