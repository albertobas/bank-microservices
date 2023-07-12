import { type Loan } from '../../v1/entities';

export interface LoanInteractorResponse {
  success: boolean;
  error: boolean;
  message: string;
  data: Loan | null;
}

export interface LoansInteractorResponse {
  success: boolean;
  error: boolean;
  message: string;
  data: Loan[] | null;
}
