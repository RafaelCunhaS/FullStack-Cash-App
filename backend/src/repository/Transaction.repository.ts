import Transaction from '../database/models/Transaction.model';
import { TokenPayload } from '../interfaces/RequestUser.interface';
import { ITransactionModel } from '../interfaces/Transaction.interface';
import db from '../database/models';
import Account from '../database/models/Account.model';
import { Op } from 'sequelize'

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

  async getAll(accountId: number, dateStart: string | undefined,
    dateEnd: string | undefined): Promise<Transaction[]> {    

    const transactions = !dateStart && !dateEnd ?
    await this._model.findAll({ include: [{ association: 'debitedUser', attributes: ['username'] },
    { association: 'creditedUser', attributes: ['username'] }], where: {
      [Op.or]: [{debitedAccountId: accountId}, {creditedAccountId: accountId}],
    }})
    :
    await this._model.findAll({ include: [{ association: 'debitedUser', attributes: ['username'] },
    { association: 'creditedUser', attributes: ['username'] }], where: { [Op.and]: [
      { [Op.or]: [{debitedAccountId: accountId}, {creditedAccountId: accountId}] },
      { createdAt: { [Op.between]: [dateStart,
        dateEnd && new Date(new Date(dateEnd).setDate(new Date(dateEnd).getDate() + 1))] } },
      ] }})

    return transactions
  }
}