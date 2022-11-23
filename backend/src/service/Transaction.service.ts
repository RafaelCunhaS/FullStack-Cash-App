import { StatusCodes } from 'http-status-codes';
import Transaction from '../database/models/Transaction.model';
import { IAccountModel } from '../interfaces/Account.interface';
import { TokenPayload } from '../interfaces/RequestUser.interface';
import { ITransactionModel, ITransactionService, TransactionType } from '../interfaces/Transaction.interface';
import { IUserModel } from '../interfaces/User.interface';
import ErrorHandler from '../utils/ErrorHandler';

export default class TransactionService implements ITransactionService {
  constructor(private _model: ITransactionModel,
    private _accountModel: IAccountModel, private _userModel: IUserModel) {}

  private async checkBalance(accountId: number, value: number): Promise<void> {
    const cashOutAccount = await this._accountModel.getBalance(accountId)

    if (!cashOutAccount) throw new Error()

    if (Number(cashOutAccount.balance) < value) {      
      throw new ErrorHandler(StatusCodes.FORBIDDEN,
        'Not enough money in account to make this transaction')
    }
  }

  private async getData(username: string): Promise<TokenPayload> {
    const cashInData = await this._userModel.getByUsername(username)

    if (!cashInData) throw new ErrorHandler(StatusCodes.BAD_REQUEST,
      'Username to receive the cash in doesn\'t exists')

    return ({ username: cashInData.username, accountId: cashInData.accountId })
  }

  async create(cashOutData: TokenPayload,
  cashInUsername: string, value: number): Promise<Transaction> {
    if (cashOutData.username === cashInUsername) {
      throw new ErrorHandler(StatusCodes.FORBIDDEN, 'Cannot make transactions between the same user')
    }
    const cashInData = await this.getData(cashInUsername)

    await this.checkBalance(cashOutData.accountId, value)

    const transaction = await this._model.create(cashOutData, cashInData, value)

    return transaction
  }

  async getAll(accountId: number,
  dates: [string, string] | undefined,
  type: TransactionType): Promise<Transaction[]> {
    let transactions = await this._model.getAll(accountId, dates)

    if (type) {
      if (type === 'cashOut') {
        transactions = transactions.filter((item) => Number(item.debitedAccountId) === accountId)
      }
      else if (type === 'cashIn') {
        transactions = transactions.filter((item) => Number(item.creditedAccountId) === accountId)
      }
    }

    return transactions
  }
}