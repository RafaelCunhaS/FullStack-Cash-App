import User from '../database/models/User.model'

export interface IUserInfo {
  username: string,
  password: string
}

export interface IUserModel {
  getByUsername(username: string): Promise<User | null>
  create(userData: IUserInfo): Promise<User>
}

export interface IUserService {
  create(userData: IUserInfo): Promise<User>
}