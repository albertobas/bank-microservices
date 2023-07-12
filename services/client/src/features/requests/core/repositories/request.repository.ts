import { type RequestInteractorResponse, type RequestsInteractorResponse } from 'bank-utils/api/v1/types';

interface RequestRepository {
  /**
   * Get all requests.
   * @returns a Promise that resolves to a `RequestsInteractorResponse` object.
   */
  getAll: () => Promise<RequestsInteractorResponse>;

  /**
   * Get a request by its identifier.
   * @param identifier request identifier.
   * @returns a Promise that resolves to a `RequestInteractorResponse` object.
   */
  getByIdentifier: (identifier: number) => Promise<RequestInteractorResponse>;
}

export default RequestRepository;
