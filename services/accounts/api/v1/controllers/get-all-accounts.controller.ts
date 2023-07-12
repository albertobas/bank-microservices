import { type Request, type Response } from 'express';
import { getAllAccountsWithDep } from '../core/interactors';
import { StatusCodes } from 'http-status-codes';

export const getAllAccountsController = async (request: Request, response: Response): Promise<void> => {
  const { success, ...rest } = await getAllAccountsWithDep();

  // If the request succeeded
  if (success) {
    response.status(StatusCodes.OK).json({ success, ...rest });
  }
  // If the request did not succeed
  else {
    response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success, ...rest });
  }
};
