import { type Request, type Response } from 'express';
import { createCustomerWithDep } from '../core/interactors';
import { isInstanceOfCustomer, customerBadRequestMessage } from 'bank-utils/api/v1/helpers';
import { StatusCodes } from 'http-status-codes';

export const createCustomerController = async ({ body }: Request, response: Response): Promise<void> => {
  const { customer } = body;

  // if body is not an instance of Customer
  if (!isInstanceOfCustomer(customer)) {
    response
      .status(StatusCodes.BAD_REQUEST)
      .json({ success: false, error: true, message: customerBadRequestMessage, data: null });
  }
  // If request is valid, call the interactor
  else {
    const { success, ...rest } = await createCustomerWithDep(customer);
    // If the request succeeded
    if (success) {
      response.status(StatusCodes.OK).json({ success, ...rest });
    }
    // If the request did not succeed
    else {
      response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success, ...rest });
    }
  }
};
