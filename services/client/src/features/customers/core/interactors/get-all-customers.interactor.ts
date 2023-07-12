import { errorMessage } from 'bank-utils/api/v1/helpers';
import { type CustomersInteractorResponse } from 'bank-utils/api/v1/types';
import type CustomerRepository from '../repositories/customer.repository';

const getAllCustomers = (repository: CustomerRepository) => async (): Promise<CustomersInteractorResponse> => {
  try {
    const response = await repository.getAll();
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

export default getAllCustomers;
