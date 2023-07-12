import { type Request, type Response } from 'express';
import { getAllLoansWithDep } from '../core/interactors';
import { StatusCodes } from 'http-status-codes';

export const getAllLoansController = async (request: Request, response: Response): Promise<void> => {
  const { success, ...rest } = await getAllLoansWithDep();

  // If the request succeeded
  if (success) {
    response.status(StatusCodes.OK).json({ success, ...rest });
  }
  // If the request did not succeed
  else {
    response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success, ...rest });
  }
};
