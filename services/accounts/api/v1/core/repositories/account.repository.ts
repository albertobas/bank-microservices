import { type Account } from 'bank-utils/api/v1/entities';

/**
 * Account repository.
 */
interface AccountRepository {
  /**
   * Connect to MongoDB using a url.
   */
  connect: () => Promise<void>;

  /**
   * Close the client and its underlying connections.
   */
  close: () => Promise<void>;

  /**
   * Create an account.
   * @param account `Account` entity object.
   */
  create: (account: Account) => Promise<void>;

  /**
   * Delete an account by its number.
   * @param number account number.
   */
  deleteByNumber: (number: number) => Promise<void>;

  /**
   * Deposit an amount to an account.
   * @param number account number.
   * @param amount amount to be deposited.
   */
  deposit: (number: number, amount: number) => Promise<void>;

  /**
   * Get all accounts.
   * @returns a Promise that resolves to an array of `Account` objects.
   */
  getAll: () => Promise<Account[]>;

  /**
   * Get an account by its number.
   * @param number account number.
   * @returns a Promise that resolves to an `Account` object.
   */
  getByNumber: (number: number) => Promise<Account>;

  /**
   * Delete an account by its number.
   * @param type Type of message to be logged. Either 'info', 'warn' or 'error'.
   * @param message Message to be logged.
   */
  log: (type: 'info' | 'warn' | 'error', message: any) => void;

  /**
   * Update an account.
   * @param account `Account` entity object.
   */
  update: (account: Account) => Promise<void>;

  /**
   * Withdraw from an account.
   * @param number account number.
   * @param amount amount to be deposited.
   */
  withdraw: (number: number, amount: number) => Promise<void>;
}

export default AccountRepository;
