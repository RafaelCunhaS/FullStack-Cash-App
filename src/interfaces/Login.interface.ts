import User from '../database/models/User.model';

export interface ILoginService {
  userLogin(data: Omit<User, 'id'>): Promise<Omit<User, 'password'>>
}