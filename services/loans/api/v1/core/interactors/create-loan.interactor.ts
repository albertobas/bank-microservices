import { type InteractorResponse } from 'bank-utils/api/v1/types';
import { type Loan } from 'bank-utils/api/v1/entities';
import { clientClosingErrorMessage, errorMessage } from 'bank-utils/api/v1/helpers';
import type LoanRepository from '../repositories/loan.repository';

const createLoan =
  (repository: LoanRepository) =>
  async (loan: Loan): Promise<InteractorResponse> => {
    try {
      await repository.connect();
      await repository.create(loan);
      return { success: true, error: false, message: 'A loan has been succesfully created.', data: null };
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

export default createLoan;
