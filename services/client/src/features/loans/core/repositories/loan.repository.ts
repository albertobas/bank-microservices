import { type Loan } from 'bank-utils/api/v1/entities';
import {
  type InteractorResponse,
  type LoanInteractorResponse,
  type LoansInteractorResponse
} from 'bank-utils/api/v1/types';
import { LoanDefault } from 'src/features/shared/types';

interface LoanRepository {
  /**
   * Create a loan.
   * @param loan `Loan` entity object.
   * @returns a Promise that resolves to an `InteractorResponse` object.
   */
  create: (loan: Loan) => Promise<InteractorResponse>;

  /**
   * Delete a loan by its identifier.
   * @param identifier loan identifier.
   * @returns a Promise that resolves to an `InteractorResponse` object.
   */
  deleteByIdentifier: (identifier: number) => Promise<InteractorResponse>;

  /**
   * Get all loans.
   * @returns a Promise that resolves to a `LoansInteractorResponse` object.
   */
  getAll: () => Promise<LoansInteractorResponse>;

  /**
   * Get a loan by its identifier.
   * @param identifier loan identifier.
   * @returns a Promise that resolves to a `LoanInteractorResponse` object.
   */
  getByIdentifier: (identifier: number) => Promise<LoanInteractorResponse>;

  /**
   * Request a loan default prediction.
   * @param loanDefault `LoanDefault` entity object.
   * @returns a Promise that resolves to `1` if a default is most likely and `0` otherwise.
   */
  requestPrediction: (loanDefault: LoanDefault) => Promise<number>;

  /**
   * Update a loan.
   * @param loan `Loan` entity object.
   * @returns a Promise that resolves to an `InteractorResponse` object.
   */
  update: (loan: Loan) => Promise<InteractorResponse>;
}

export default LoanRepository;
