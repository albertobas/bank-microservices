import { type Request, type Response } from 'express';
import { deleteLoanByIdWithDep } from '../core/interactors';
import { StatusCodes } from 'http-status-codes';
import { identifierBadRequestMessage } from 'bank-utils/api/v1/helpers';

export const deleteLoanByIdentifierController = async ({ params }: Request, response: Response): Promise<void> => {
  const { identifier } = params;
  const intIdentifier = parseInt(identifier);

  // If id is not valid
  if (isNaN(intIdentifier)) {
    response
      .status(StatusCodes.BAD_REQUEST)
      .json({ success: false, error: true, message: identifierBadRequestMessage, data: null });
  }
  // If request is valid, call the interactor
  else {
    const { success, ...rest } = await deleteLoanByIdWithDep(intIdentifier);
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
