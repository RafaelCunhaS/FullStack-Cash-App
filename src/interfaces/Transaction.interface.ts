import Transaction from '../database/models/Transaction.model';
import { TokenPayload } from './RequestUser.interface'

export interface ITransactionModel {
  create(cashOutData: TokenPayload,
  cashInData: TokenPayload, value: number): Promise<Transaction>
}

export interface ITransactionService {
  create(cashOutData: TokenPayload,
  cashInUsername: string, value: number): Promise<Transaction>
}