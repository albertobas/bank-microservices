import { type RequestsInteractorResponse } from 'bank-utils/api/v1/types';
import { clientClosingErrorMessage, errorMessage } from 'bank-utils/api/v1/helpers';
import type RequestRepository from '../repositories/request.repository';

const getAllRequests = (repository: RequestRepository) => async (): Promise<RequestsInteractorResponse> => {
  try {
    await repository.connect();
    const requests = await repository.getAll();
    return {
      success: true,
      error: false,
      message: 'All requests have been succesfully retrieved.',
      data: requests.length > 0 ? requests : null
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

export default getAllRequests;
