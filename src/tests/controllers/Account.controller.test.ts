import { expect } from 'chai';
import * as sinon from 'sinon';
import { Response } from 'express';
import AccountController from '../../controller/Account.controller';
import AccountService from '../../service/Account.service';
import AccountRepository from '../../repository/Account.repository';
import UserRepository from '../../repository/User.repository'
import Account from '../../database/models/Account.model';
import { RequestUser } from '../../interfaces/RequestUser.interface';

describe('AccountController class', () => {
  const accountRepository = new AccountRepository()
  const userRepository = new UserRepository();
  const accountService = new AccountService(accountRepository,userRepository);
  const accountController = new AccountController(accountService);
  const req = {} as RequestUser;
  const res = {} as Response;

	const accountReturned = {
		id: 1,
		baçance: 100
	}

  before(() => {
    sinon.stub(accountService, 'getBalance').resolves(accountReturned as unknown as Account)

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  after(() => {
    sinon.restore()
  })

  describe('Getting an account balance', () => {
    it('If it is successful, should return a status 200 and the account info on its body', async () => {
      req.params = { username: 'Joaozinho' }
      req.user = { username: 'Joaozinho', accountId: 1 }
      await accountController.getBalance(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(accountReturned)).to.be.true;
    });
  });
});