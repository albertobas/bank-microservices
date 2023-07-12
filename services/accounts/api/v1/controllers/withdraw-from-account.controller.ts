import { type Request, type Response } from 'express';
import { withdrawFromAccountWithDep } from '../core/interactors';
import { StatusCodes } from 'http-status-codes';
import {
  amountBadRequestMessage,
  amountNumberBadRequestMessage,
  numberBadRequestMessage
} from 'bank-utils/api/v1/helpers';

export const withdrawFromAccountController = async ({ body }: Request, response: Response): Promise<void> => {
  const { number, amount } = body;

  const intNumber = parseInt(number);
  const intAmount = parseFloat(amount);

  // If request is not valid
  if (isNaN(intNumber) || isNaN(intAmount)) {
    // If number and amount are not valid
    if (isNaN(intNumber) && isNaN(intAmount)) {
      response
        .status(StatusCodes.BAD_REQUEST)
        .json({ success: false, error: true, message: amountNumberBadRequestMessage, data: null });
    } else if (isNaN(intNumber)) {
      // If number is not valid
      response
        .status(StatusCodes.BAD_REQUEST)
        .json({ success: false, error: true, message: numberBadRequestMessage, data: null });
    }
    // If amount is not valid
    else {
      response
        .status(StatusCodes.BAD_REQUEST)
        .json({ success: false, error: true, message: amountBadRequestMessage, data: null });
    }
  }
  // If request is valid, call the interactor
  else {
    const { success, ...rest } = await withdrawFromAccountWithDep(intNumber, intAmount);
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
