import { errorMessage } from 'bank-utils/api/v1/helpers';
import { type InteractorResponse } from 'bank-utils/api/v1/types';
import type LoanRepository from '../repositories/loan.repository';

const deleteLoanByIdentifier =
  (repository: LoanRepository) =>
  async (identifier: number): Promise<InteractorResponse> => {
    try {
      const response = await repository.deleteByIdentifier(identifier);
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

export default deleteLoanByIdentifier;
