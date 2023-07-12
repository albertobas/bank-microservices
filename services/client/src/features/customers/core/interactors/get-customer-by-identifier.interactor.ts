import { errorMessage } from 'bank-utils/api/v1/helpers';
import { type CustomerInteractorResponse } from 'bank-utils/api/v1/types';
import type CustomerRepository from '../repositories/customer.repository';

const getCustomerByIdentifier =
  (repository: CustomerRepository) =>
  async (identifier: number): Promise<CustomerInteractorResponse> => {
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

export default getCustomerByIdentifier;
