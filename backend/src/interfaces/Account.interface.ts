import Account from '../database/models/Account.model'

export interface IAccountModel {
  getBalance(id: number): Promise<Account | null>
}

export interface IAccountService {
  getBalance(id: number, username: string): Promise<Account>
}