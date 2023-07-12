import { type Request, type Response } from 'express';
import { createAccountWithDep } from '../core/interactors';
import { isInstanceOfAccount, accountBadRequestMessage } from 'bank-utils/api/v1/helpers';
import { StatusCodes } from 'http-status-codes';

export const createAccountController = async ({ body }: Request, response: Response): Promise<void> => {
  const { account } = body;

  // if body is not an instance of Account
  if (!isInstanceOfAccount(account)) {
    response
      .status(StatusCodes.BAD_REQUEST)
      .json({ success: false, error: true, message: accountBadRequestMessage, data: null });
  }
  // If request is valid, call the interactor
  else {
    const { success, ...rest } = await createAccountWithDep(account);
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
