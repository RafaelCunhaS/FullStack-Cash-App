import { StatusCodes } from 'http-status-codes';
import { ILoginService } from '../interfaces/Login.interface';
import { IUserModel } from '../interfaces/User.interface';
import md5 from 'md5';
import ErrorHandler from '../utils/ErrorHandler';
import User from '../database/models/User.model';

export default class LoginService implements ILoginService {
  constructor(private _model: IUserModel) {}

  async userLogin(data: User): Promise<Omit<User, 'password'>> {
    const user = await this._model.getByUsername(data.username);
    const error = new ErrorHandler(StatusCodes.UNAUTHORIZED, 'Incorrect username or password');

    if (!user || user.password !== md5(data.password)) throw error;

    return {
      id: user.id,
      username: user.username,
      accountId: user.accountId
    } as Omit<User, 'password'>;
  }
}