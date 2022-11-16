import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { IAccountService } from '../interfaces/Account.interface';
import { RequestUser, TokenPayload } from '../interfaces/RequestUser.interface';

export default class AccountController {
  constructor(private _AccountService: IAccountService) { }

  async getBalance(req: RequestUser, res: Response) {
    const { username } = req.params
    const { accountId } = req.user as TokenPayload
    const account = await this._AccountService.getBalance(accountId, username);

    res.status(StatusCodes.OK).json(account);
  }
}