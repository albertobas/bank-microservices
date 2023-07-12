import { type InteractorResponse } from 'bank-utils/api/v1/types';
import { clientClosingErrorMessage, errorMessage } from 'bank-utils/api/v1/helpers';
import type AccountRepository from '../repositories/account.repository';

const deleteAccountByNumber =
  (repository: AccountRepository) =>
  async (number: number): Promise<InteractorResponse> => {
    try {
      await repository.connect();
      await repository.deleteByNumber(number);
      return {
        success: true,
        error: false,
        message: `The account number ${number} has been succesfully deleted.`,
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

export default deleteAccountByNumber;
