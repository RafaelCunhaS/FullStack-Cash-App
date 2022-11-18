import Account from '../database/models/Account.model';
import User from '../database/models/User.model';
import { IUserInfo, IUserModel } from '../interfaces/User.interface';
import db from '../database/models';

export default class UserRepository implements IUserModel {
  constructor(private _model = User, private _accountModel = Account) { }

  async getByUsername(username: string): Promise<User | null> {
    const user = await this._model.findOne({ where: { username } })

    return user
  }

  async create(userData: IUserInfo): Promise<User> {
    const { username, password } = userData
    const user = await db.transaction(async (t) => {
      const { id: accountId } = await this._accountModel.create({}, { transaction: t })

      const user = await this._model.create({ username, password, accountId }, { transaction: t })

      return user
    })

    return user;
  }
}