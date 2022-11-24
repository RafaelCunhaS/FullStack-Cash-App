import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { IQueryReturn, ITransactionService } from '../interfaces/Transaction.interface';
import { RequestUser, TokenPayload } from '../interfaces/RequestUser.interface';

export default class TransactionController {
  constructor(private _transactionService: ITransactionService) { }

  async create(req: RequestUser, res: Response) {
    const { username: cashInUsername, value } = req.body
    const cashOutData = req.user as TokenPayload
    const transaction = await this
      ._transactionService.create(cashOutData, cashInUsername, Number(value));

    res.status(StatusCodes.CREATED).json(transaction);
  }

  async getAll(req: RequestUser, res: Response) {
    const { accountId } = req.user as TokenPayload
    const { dateStart, dateEnd, type } = req.query as unknown as IQueryReturn        
    
    const transactions = await this._transactionService
      .getAll(accountId, dateStart, dateEnd, type);

    res.status(StatusCodes.OK).json(transactions);
  }
}