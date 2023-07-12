import { type Request, type Response } from 'express';
import { createLoanWithDep } from '../core/interactors';
import { isInstanceOfLoan, loanBadRequestMessage } from 'bank-utils/api/v1/helpers';
import { StatusCodes } from 'http-status-codes';

export const createLoanController = async ({ body }: Request, response: Response): Promise<void> => {
  const { loan } = body;

  // if body is not an instance of Loan
  if (!isInstanceOfLoan(loan)) {
    response
      .status(StatusCodes.BAD_REQUEST)
      .json({ success: false, error: true, message: loanBadRequestMessage, data: null });
  }
  // If request is valid, call the interactor
  else {
    const { success, ...rest } = await createLoanWithDep(loan);
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
