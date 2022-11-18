import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Token from '../utils/Token';
import { ILoginService } from '../interfaces/Login.interface';

export default class LoginController {
  constructor(private _loginService: ILoginService) { }

  async userLogin(req: Request, res: Response) {
    const { accountId, username } = await this._loginService.userLogin(req.body);

    const token = new Token().generate(accountId, username);

    res.status(StatusCodes.OK).json({ token });
  }
}