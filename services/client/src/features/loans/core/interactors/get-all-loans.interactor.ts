import { errorMessage } from 'bank-utils/api/v1/helpers';
import { type LoansInteractorResponse } from 'bank-utils/api/v1/types';
import type LoanRepository from '../repositories/loan.repository';

const getAllLoans = (repository: LoanRepository) => async (): Promise<LoansInteractorResponse> => {
  try {
    const response = await repository.getAll();
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

export default getAllLoans;
