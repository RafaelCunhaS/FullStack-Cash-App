import { StatusCodes } from 'http-status-codes';
import Account from '../database/models/Account.model';
import { IAccountModel, IAccountService } from '../interfaces/Account.interface';
import { IUserModel } from '../interfaces/User.interface';
import ErrorHandler from '../utils/ErrorHandler';

export default class AccountService implements IAccountService {
  constructor(private _model: IAccountModel, private _userModel: IUserModel) {}

  async getBalance(id: number, username: string): Promise<Account> {
      const account = await this._model.getBalance(id)
      const user = await this._userModel.getByUsername(username)

      if (!user) throw new ErrorHandler(StatusCodes.NOT_FOUND, 'User not found')

      if (!account) throw new Error()

      if (user.accountId !== account.id) {
        throw new ErrorHandler(StatusCodes.UNAUTHORIZED, 'Account unavailable for user')
      }

      return account
  }
}