import Account from '../database/models/Account.model';
import { IAccountModel } from '../interfaces/Account.interface';

export default class AccountRepository implements IAccountModel {
  constructor(private _model = Account) { }

  async getBalance(id: number): Promise<Account | null> {
    const account = await this._model.findByPk(id)

    return account
  }
}