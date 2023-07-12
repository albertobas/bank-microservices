import { type Request, type Response } from 'express';
import { getAccountByNumberWithDep } from '../core/interactors';
import { StatusCodes } from 'http-status-codes';
import { numberBadRequestMessage } from 'bank-utils/api/v1/helpers';

export const getAccountByNumberController = async ({ params }: Request, response: Response): Promise<void> => {
  const { number } = params;
  const intNumber = parseInt(number);

  // If number is not valid
  if (isNaN(intNumber)) {
    response
      .status(StatusCodes.BAD_REQUEST)
      .json({ success: false, error: true, message: numberBadRequestMessage, data: null });
  }
  // If request is valid, call the interactor
  else {
    const { success, ...rest } = await getAccountByNumberWithDep(intNumber);
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
