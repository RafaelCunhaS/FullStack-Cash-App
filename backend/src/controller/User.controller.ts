import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Token from '../utils/Token';
import { IUserService } from '../interfaces/User.interface';

export default class UserController {
  constructor(private _UserService: IUserService) { }

  async create(req: Request, res: Response) {
    const { accountId, username } = await this._UserService.create(req.body);

    const token = new Token().generate(accountId, username);

    res.status(StatusCodes.CREATED).json({ token });
  }
}