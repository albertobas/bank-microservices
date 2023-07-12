import { type Request, type Response } from 'express';
import { handleNotFoundWithDep } from '../core/interactors';
import { StatusCodes } from 'http-status-codes';

export const handleNotFoundController = ({ method, path }: Request, response: Response): void => {
  const interactorResponse = handleNotFoundWithDep(method, path);
  response.status(StatusCodes.BAD_REQUEST).send(interactorResponse);
};
