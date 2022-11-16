import { Request } from 'express';

export type TokenPayload = {
  accountId: number,
  username: string,
};

export interface RequestUser extends Request{
  user?: TokenPayload
}