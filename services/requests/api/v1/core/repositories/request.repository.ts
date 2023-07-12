import { type Request } from 'bank-utils/api/v1/entities';

interface RequestRepository {
  /**
   * Connect to MongoDB using a url.
   */
  connect: () => Promise<void>;

  /**
   * Close the client and its underlying connections.
   */
  close: () => Promise<void>;

  /**
   * Get all requests.
   * @returns a Promise that resolves to an array of `Request` objects.
   */
  getAll: () => Promise<Request[]>;

  /**
   * Get a request by its identifier.
   * @param identifier request identifier.
   * @returns a Promise that resolves to a `Request` object.
   */
  getByIdentifier: (identifier: number) => Promise<Request>;

  /**
   * Delete a request by its identifier.
   * @param type type of message to be logged. Either 'info', 'warn' or 'error'.
   * @param message message to be logged.
   */
  log: (type: 'info' | 'warn' | 'error', message: any) => void;
}

export default RequestRepository;
