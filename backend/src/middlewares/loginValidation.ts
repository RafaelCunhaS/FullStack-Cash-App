import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Joi = require('joi');
import ErrorHandler from '../utils/ErrorHandler';

const schema = Joi.object({
  username: Joi.string().min(3).required(),
  password: Joi.string().min(8)
    .regex(/[A-Z]/, 'at least one upper-case')
    .regex(/\d/, 'at least one digit').required(),
});

export default (req: Request, _res: Response, next: NextFunction) => {
  const { error } = schema.validate(req.body);

  if (error) throw new ErrorHandler(StatusCodes.BAD_REQUEST, error.message);

  return next();
};