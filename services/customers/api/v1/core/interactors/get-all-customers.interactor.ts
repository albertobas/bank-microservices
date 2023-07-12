import { type CustomersInteractorResponse } from 'bank-utils/api/v1/types';
import { clientClosingErrorMessage, errorMessage } from 'bank-utils/api/v1/helpers';
import type CustomerRepository from '../repositories/customer.repository';

const getAllCustomers = (repository: CustomerRepository) => async (): Promise<CustomersInteractorResponse> => {
  try {
    await repository.connect();
    const customers = await repository.getAll();
    return {
      success: true,
      error: false,
      message: 'All customers have been succesfully retrieved.',
      data: customers.length > 0 ? customers : null
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

export default getAllCustomers;
