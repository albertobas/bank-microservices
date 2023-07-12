import { type Request, type Response } from 'express';
import { handleInvalidMethodWithDep } from '../core/interactors';
import { StatusCodes } from 'http-status-codes';

export const handleInvalidMethodController = ({ method, path }: Request, response: Response): void => {
  const interactorResponse = handleInvalidMethodWithDep(method, path);
  response.status(StatusCodes.BAD_REQUEST).json(interactorResponse);
};
