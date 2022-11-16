import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';
import { Secret } from 'jsonwebtoken';

dotenv.config();

export default class Token {
  private _jwtConfig: jwt.SignOptions;

  constructor() {
    this._jwtConfig = {
      expiresIn: '1d',
    };
  }

  public generate(accountId: number, username: string): string {
    const jwtSecret = process.env.JWT_SECRET || 'supersecretpswrd'

    return jwt.sign({ data: { accountId, username } }, jwtSecret as Secret, this._jwtConfig);
  }
}