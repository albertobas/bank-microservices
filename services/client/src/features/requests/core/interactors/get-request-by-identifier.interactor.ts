import { errorMessage } from 'bank-utils/api/v1/helpers';
import { type RequestInteractorResponse } from 'bank-utils/api/v1/types';
import type RequestRepository from '../repositories/request.repository';

const getRequestByIdentifier =
  (repository: RequestRepository) =>
  async (identifier: number): Promise<RequestInteractorResponse> => {
    try {
      const response = await repository.getByIdentifier(identifier);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        const { message } = error;
        return { success: false, error: true, message, data: null };
      } else {
        return { success: false, error: true, message: errorMessage, data: null };
      }
    }
  };

export default getRequestByIdentifier;
