import Transaction from '../database/models/Transaction.model';
import { TokenPayload } from '../interfaces/RequestUser.interface';
import { ITransactionModel, TransactionType } from '../interfaces/Transaction.interface';
import db from '../database/models';
import Account from '../database/models/Account.model';
import { Op } from 'sequelize'
import sequelize from 'sequelize';

export default class TransactionRepository implements ITransactionModel {
  constructor(private _model = Transaction, private _accountModel = Account) { }

  async create(cashOutData: TokenPayload,
  cashInData: TokenPayload, value: number): Promise<Transaction> {
    const transaction = await db.transaction(async (t) => {
      await this._accountModel.decrement(
        'balance',
        { by: value, where: { id: cashOutData.accountId }, transaction: t }
      )
  
      await this._accountModel.increment(
        'balance',
        { by: value, where: { id: cashInData.accountId }, transaction: t }
      )
      
      const transaction = await this._model.create(
        { debitedAccountId: cashOutData.accountId, creditedAccountId: cashInData.accountId, value },
        { transaction: t }
      )

      return transaction
    })

    return transaction
  }

  async getAll(accountId: number, date: string | undefined): Promise<Transaction[]> {
    const transactions = !date ? await this._model.findAll({ where: {
      [Op.or]: [{debitedAccountId: accountId}, {creditedAccountId: accountId}],
    }}) : (
    await this._model.findAll({ where: { [Op.and]: [
      { [Op.or]: [{debitedAccountId: accountId}, {creditedAccountId: accountId}] },
      sequelize.where(sequelize.fn('date', sequelize.col('created_at')), '=', date),
      ] }})
    )

    return transactions
  }
}