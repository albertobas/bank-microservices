import { type Customer } from 'bank-utils/api/v1/entities';
import { errorMessage } from 'bank-utils/api/v1/helpers';
import { type InteractorResponse } from 'bank-utils/api/v1/types';
import type CustomerRepository from '../repositories/customer.repository';

const createCustomer =
  (repository: CustomerRepository) =>
  async (customer: Customer): Promise<InteractorResponse> => {
    try {
      const response = await repository.create(customer);
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

export default createCustomer;
