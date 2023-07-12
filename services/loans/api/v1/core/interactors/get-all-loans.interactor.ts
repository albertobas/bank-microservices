import { type LoansInteractorResponse } from 'bank-utils/api/v1/types';
import { clientClosingErrorMessage, errorMessage } from 'bank-utils/api/v1/helpers';
import type LoanRepository from '../repositories/loan.repository';

const getAllLoans = (repository: LoanRepository) => async (): Promise<LoansInteractorResponse> => {
  try {
    await repository.connect();
    const loans = await repository.getAll();
    return {
      success: true,
      error: false,
      message: 'All loans have been succesfully retrieved.',
      data: loans.length > 0 ? loans : null
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

export default getAllLoans;
