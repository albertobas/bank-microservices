import { type InteractorResponse } from 'bank-utils/api/v1/types';
import { clientClosingErrorMessage, errorMessage } from 'bank-utils/api/v1/helpers';
import type CustomerRepository from '../repositories/customer.repository';

const deleteCustomerByIdentifier =
  (repository: CustomerRepository) =>
  async (identifier: number): Promise<InteractorResponse> => {
    try {
      await repository.connect();
      await repository.deleteByIdentifier(identifier);
      return {
        success: true,
        error: false,
        message: `The customer with id ${identifier} has been succesfully deleted.`,
        data: null
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

export default deleteCustomerByIdentifier;
