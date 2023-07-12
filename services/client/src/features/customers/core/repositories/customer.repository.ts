import { type Customer } from 'bank-utils/api/v1/entities';
import {
  type InteractorResponse,
  type CustomerInteractorResponse,
  type CustomersInteractorResponse
} from 'bank-utils/api/v1/types';

interface CustomerRepository {
  /**
   * Create a customer.
   * @param customer `Customer` entity object.
   * @returns a Promise that resolves to an `InteractorResponse` object.
   */
  create: (customer: Customer) => Promise<InteractorResponse>;

  /**
   * Delete a customer by its identifier.
   * @param identifier customer identifier.
   * @returns a Promise that resolves to an `InteractorResponse` object.
   */
  deleteByIdentifier: (identifier: number) => Promise<InteractorResponse>;

  /**
   * Get all customers.
   * @returns a Promise that resolves to a `CustomersInteractorResponse` object.
   */
  getAll: () => Promise<CustomersInteractorResponse>;

  /**
   * Get a customer by its identifier.
   * @param identifier customer identifier.
   * @returns a Promise that resolves to a `CustomerInteractorResponse` object.
   */
  getByIdentifier: (identifier: number) => Promise<CustomerInteractorResponse>;

  /**
   * Update a customer.
   * @param customer `Customer` entity object.
   * @returns a Promise that resolves to an `InteractorResponse` object.
   */
  update: (customer: Customer) => Promise<InteractorResponse>;
}

export default CustomerRepository;
