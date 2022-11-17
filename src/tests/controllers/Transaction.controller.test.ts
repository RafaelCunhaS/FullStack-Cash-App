import { expect } from 'chai';
import * as sinon from 'sinon';
import { Response } from 'express';
import TransactionController from '../../controller/Transaction.controller';
import TransactionService from '../../service/Transaction.service';
import TransactionRepository from '../../repository/Transaction.repository';
import UserRepository from '../../repository/User.repository'
import AccountRepository from '../../repository/Account.repository'
import Transaction from '../../database/models/Transaction.model';
import { RequestUser } from '../../interfaces/RequestUser.interface';

describe('TransactionController class', () => {
  const transactionRepository = new TransactionRepository()
  const userRepository = new UserRepository();
  const accountRepository = new AccountRepository();
  const transactionService = new TransactionService(transactionRepository,
    accountRepository, userRepository);
  const transactionController = new TransactionController(transactionService);
  const req = {} as RequestUser;
  const res = {} as Response;

  const cashOutDataMock = {
    username: 'Joaozinho',
    accountId: 1
  }
	const transactionReturned = {
		id: 1,
    debitedAccountId: 1,
    creditedAccountId: 2,
    value: 80,
    createdAt: '2022-11-17 14:19:00.996 +00:00'
	}

  before(() => {
    sinon.stub(transactionService, 'create').resolves(transactionReturned as unknown as Transaction)

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  after(() => {
    sinon.restore()
  })

  describe('Making a new transaction', () => {
    it('If it is successful, should return a status 200 and the transaction info on its body',
    async () => {
      req.body = { username: 'Mariazinha', value: 80 };
      req.user = cashOutDataMock
      await transactionController.create(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(transactionReturned)).to.be.true;
    });
  });
});