import { type RequestInteractorResponse } from 'bank-utils/api/v1/types';
import { clientClosingErrorMessage, errorMessage } from 'bank-utils/api/v1/helpers';
import type RequestRepository from '../repositories/request.repository';

const getRequestByIdentifier =
  (repository: RequestRepository) =>
  async (identifier: number): Promise<RequestInteractorResponse> => {
    try {
      await repository.connect();
      const request = await repository.getByIdentifier(identifier);
      return {
        success: true,
        error: false,
        message: `The request with identifier ${identifier} has been succesfully retrieved.`,
        data: request
      };
    } catch (error) {
      repository.log('error', error);
      if (error instanceof Error) {
        const { message } = error;
        return { success: false, error: true, message, data: null };
      } else {
        return { success: false, error: true, message: errorMessage, data: null };
      }
    } finally {
      try {
        await repository.close();
      } catch (error) {
        if (error instanceof Error) {
          repository.log('warn', error.stack ?? error.message);
        } else {
          repository.log('warn', clientClosingErrorMessage);
        }
      }
    }
  };

export default getRequestByIdentifier;
