import Transaction from '../database/models/Transaction.model';
import { TokenPayload } from './RequestUser.interface'

export type TransactionType = 'cashOut' | 'cashIn' | undefined

export interface IQueryReturn {
  date: string | undefined
  type: TransactionType
}

export interface ITransactionModel {
  create(cashOutData: TokenPayload,
  cashInData: TokenPayload, value: number): Promise<Transaction>
  getAll(accountId: number, date: string | undefined): Promise<Transaction[]>
}

export interface ITransactionService {
  create(cashOutData: TokenPayload,
  cashInUsername: string, value: number): Promise<Transaction>
  getAll(accountId: number,
    date: string | undefined, type: TransactionType): Promise<Transaction[]>
}