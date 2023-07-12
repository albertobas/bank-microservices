import { type Loan } from 'bank-utils/api/v1/entities';

interface LoanRepository {
  /**
   * Connect to MongoDB using a url.
   */
  connect: () => Promise<void>;

  /**
   * Close the client and its underlying connections.
   */
  close: () => Promise<void>;

  /**
   * Create a loan.
   * @param loan `Loan` entity object.
   */
  create: (loan: Loan) => Promise<void>;

  /**
   * Delete a loan by its identifier.
   * @param identifier loan identifier.
   */
  deleteByIdentifier: (identifier: number) => Promise<void>;

  /**
   * Get all loans.
   * @returns a Promise that resolves to an array of `Loan` objects.
   */
  getAll: () => Promise<Loan[]>;

  /**
   * Get a loan by its identifier.
   * @param identifier loan identifier.
   * @returns a Promise that resolves to a `Loan` object.
   */
  getByIdentifier: (identifier: number) => Promise<Loan>;

  /**
   * Delete a loan by its identifier.
   * @param type type of message to be logged. Either 'info', 'warn' or 'error'.
   * @param message message to be logged.
   */
  log: (type: 'info' | 'warn' | 'error', message: any) => void;

  /**
   * Update a loan.
   * @param loan `Loan` entity object.
   */
  update: (loan: Loan) => Promise<void>;
}

export default LoanRepository;
