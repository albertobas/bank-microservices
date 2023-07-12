import { type Request, type Response } from 'express';
import { updateCustomerWithDep } from '../core/interactors';
import { isInstanceOfCustomer, customerBadRequestMessage } from 'bank-utils/api/v1/helpers';
import { StatusCodes } from 'http-status-codes';

export const updateCustomerController = async ({ body }: Request, response: Response): Promise<void> => {
  const { customer } = body;

  // If customer is not valid
  if (!isInstanceOfCustomer(customer)) {
    response
      .status(StatusCodes.BAD_REQUEST)
      .json({ success: false, error: true, message: customerBadRequestMessage, data: null });
  }
  // If request is valid, call the interactor
  else {
    const { success, ...rest } = await updateCustomerWithDep(customer);
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
