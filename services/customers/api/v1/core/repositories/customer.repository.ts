import { type Customer } from 'bank-utils/api/v1/entities';

interface CustomerRepository {
  /**
   * Connect to MongoDB using a url.
   */
  connect: () => Promise<void>;

  /**
   * Close the client and its underlying connections.
   */
  close: () => Promise<void>;

  /**
   * Create a customer.
   * @param customer `Customer` entity object.
   */
  create: (customer: Customer) => Promise<void>;

  /**
   * Delete a customer by its identifier.
   * @param identifier customer identifier.
   */
  deleteByIdentifier: (identifier: number) => Promise<void>;

  /**
   * Get all customers.
   * @returns a Promise that resolves to an array of `Customer` objects.
   */
  getAll: () => Promise<Customer[]>;

  /**
   * Get a customer by its identifier.
   * @param identifier customer identifier.
   * @returns a Promise that resolves to a `Customer` object.
   */
  getByIdentifier: (identifier: number) => Promise<Customer>;

  /**
   * Delete a customer by its identifier.
   * @param type type of message to be logged. Either 'info', 'warn' or 'error'.
   * @param message message to be logged.
   */
  log: (type: 'info' | 'warn' | 'error', message: any) => void;

  /**
   * Update a customer.
   * @param customer `Customer` entity object.
   */
  update: (customer: Customer) => Promise<void>;
}

export default CustomerRepository;
