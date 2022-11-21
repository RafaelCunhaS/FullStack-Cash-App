import { NextFunction, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { JwtPayload, Secret, verify } from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { RequestUser } from '../interfaces/RequestUser.interface';
import ErrorHandler from '../utils/ErrorHandler';

dotenv.config();

export default async (req: RequestUser, _res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) throw new ErrorHandler(StatusCodes.UNAUTHORIZED, 'Token not found');

  try {
    const jwtSecret = process.env.JWT_SECRET || 'supersecretpswrd'
    const decoded = verify(token, jwtSecret as Secret) as JwtPayload;

    req.user = decoded.data;

    next();
  } catch (err) {
    throw new ErrorHandler(StatusCodes.UNAUTHORIZED, 'Expired or invalid token');
  }
}