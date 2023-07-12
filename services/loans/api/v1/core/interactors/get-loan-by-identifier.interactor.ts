import { type LoanInteractorResponse } from 'bank-utils/api/v1/types';
import { clientClosingErrorMessage, errorMessage } from 'bank-utils/api/v1/helpers';
import type LoanRepository from '../repositories/loan.repository';

const getLoanByIdentifier =
  (repository: LoanRepository) =>
  async (identifier: number): Promise<LoanInteractorResponse> => {
    try {
      await repository.connect();
      const loan = await repository.getByIdentifier(identifier);
      return {
        success: true,
        error: false,
        message: `The loan with identifier ${identifier} has been succesfully retrieved.`,
        data: loan
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

export default getLoanByIdentifier;
