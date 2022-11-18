import User from '../database/models/User.model';
import { IUserInfo, IUserModel, IUserService } from '../interfaces/User.interface';
import ErrorHandler from '../utils/ErrorHandler';
import { StatusCodes } from 'http-status-codes';

export default class UserService implements IUserService {
  constructor(private _model: IUserModel) {}

  async create(userData: IUserInfo): Promise<User> {
    const validateUsername = await this._model.getByUsername(userData.username)
    if (validateUsername) {
      throw new ErrorHandler(StatusCodes.CONFLICT, 'Username already registered')
    }

    const user = await this._model.create(userData)

    return user
  }
}