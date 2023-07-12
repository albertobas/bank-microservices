import { Loan } from 'bank-utils/api/v1/entities';
import { errorMessage } from 'bank-utils/api/v1/helpers';
import { type InteractorResponse } from 'bank-utils/api/v1/types';
import type LoanRepository from '../repositories/loan.repository';

const updateLoan =
  (repository: LoanRepository) =>
  async (loan: Loan): Promise<InteractorResponse> => {
    try {
      const response = await repository.update(loan);
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

export default updateLoan;
