import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import ErrorHandler from '../utils/ErrorHandler';

export default (error: ErrorHandler, _req: Request, res: Response, _next: NextFunction) => {
  if (error.status) {
    return res.status(error.status).json({ message: error.message });
  }

  console.error(error);
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
};