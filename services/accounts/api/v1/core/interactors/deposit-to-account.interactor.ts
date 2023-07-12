import { type InteractorResponse } from 'bank-utils/api/v1/types';
import { clientClosingErrorMessage, errorMessage } from 'bank-utils/api/v1/helpers';
import type AccountRepository from '../repositories/account.repository';

const depositToAccount =
  (repository: AccountRepository) =>
  async (number: number, amount: number): Promise<InteractorResponse> => {
    try {
      await repository.connect();
      await repository.deposit(number, amount);
      return {
        success: true,
        error: false,
        message: `An amount of ${amount} has been succesfully deposited to account with number ${number}.`,
        data: null
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

export default depositToAccount;
