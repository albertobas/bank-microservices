import { type Account } from 'bank-utils/api/v1/entities';
import {
  type InteractorResponse,
  type AccountInteractorResponse,
  type AccountsInteractorResponse
} from 'bank-utils/api/v1/types';

/**
 * Account repository.
 */
interface AccountRepository {
  /**
   * Create an account.
   * @param account `Account` entity object.
   * @returns a Promise that resolves to an `InteractorResponse` object.
   */
  create: (account: Account) => Promise<InteractorResponse>;

  /**
   * Delete an account by its number.
   * @param number account number.
   * @returns a Promise that resolves to an `InteractorResponse` object.
   */
  deleteByNumber: (number: number) => Promise<InteractorResponse>;

  /**
   * Deposit an amount to an account.
   * @param number account number.
   * @param amount amount to be deposited.
   * @returns a Promise that resolves to an `InteractorResponse` object.
   */
  deposit: (number: number, amount: number) => Promise<InteractorResponse>;

  /**
   * Get all accounts.
   * @returns a Promise that resolves to an `AccountsInteractorResponse` object.
   */
  getAll: () => Promise<AccountsInteractorResponse>;

  /**
   * Get an account by its number.
   * @param number account number.
   * @returns a Promise that resolves to an `AccountInteractorResponse` object.
   */
  getByNumber: (number: number) => Promise<AccountInteractorResponse>;

  /**
   * Update an account.
   * @param account `Account` entity object.
   * @returns a Promise that resolves to an `InteractorResponse` object.
   */
  update: (account: Account) => Promise<InteractorResponse>;

  /**
   * Withdraw from an account.
   * @param number account number.
   * @param amount amount to be deposited.
   * @returns a Promise that resolves to an `InteractorResponse` object.
   */
  withdraw: (number: number, amount: number) => Promise<InteractorResponse>;
}

export default AccountRepository;
