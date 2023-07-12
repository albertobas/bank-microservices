import { errorMessage } from 'bank-utils/api/v1/helpers';
import { LoanDefault } from 'src/features/shared/types';
import type LoanRepository from '../repositories/loan.repository';

interface LoanDefaultPredicitonInteractorResponse {
  success: boolean;
  error: boolean;
  message: string;
  data: boolean | null;
}

const requestLoanDefaultPrediction =
  (repository: LoanRepository) =>
  async (identifier: number, loanDefault: LoanDefault): Promise<LoanDefaultPredicitonInteractorResponse> => {
    try {
      const prediction = await repository.requestPrediction(loanDefault);
      const isDefault = prediction === 1;
      return {
        success: true,
        error: false,
        message: `A prediction for the loan with identifier ${identifier.toString()} has been made as requested. It is most likely that the loan will ${
          isDefault ? '' : 'not '
        }default.`,
        data: isDefault
      };
    } catch (error) {
      if (error instanceof Error) {
        const { message } = error;
        return { success: false, error: true, message, data: null };
      } else {
        return { success: false, error: true, message: errorMessage, data: null };
      }
    }
  };

export default requestLoanDefaultPrediction;
