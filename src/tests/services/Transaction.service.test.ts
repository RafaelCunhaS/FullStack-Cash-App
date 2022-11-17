import { expect } from 'chai';
import sinon from 'sinon';
import TransactionRepository from '../../repository/Transaction.repository'
import UserRepository from '../../repository/User.repository'
import AccountRepository from '../../repository/Account.repository'
import TransactionService from '../../service/Transaction.service'
import md5 from 'md5';
import Transaction from '../../database/models/Transaction.model';
import User from '../../database/models/User.model';
import Account from '../../database/models/Account.model';

describe('TransactionService class', () => {
  const transactionRepository = new TransactionRepository();
  const userRepository = new UserRepository();
  const accountRepository = new AccountRepository();
	const transactionService = new TransactionService(transactionRepository, 
    accountRepository, userRepository);

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
  const userReturnedMock = {
		id: 2,
		username: 'Mariazinha',
		password: md5('Z7654321'),
		accountId: 2
	}
  const cashOutAccountMock = {
    id: 1,
    balance: 100
  }

	before(() => {
    sinon.stub(userRepository, 'getByUsername')
      .onCall(0).resolves(null)
      .onCall(1).resolves(userReturnedMock as unknown as User)
      .onCall(2).resolves(userReturnedMock as unknown as User)
      .onCall(3).resolves(userReturnedMock as unknown as User);
    sinon.stub(accountRepository, 'getBalance')
      .onCall(0).resolves(null)
      .onCall(1).resolves(cashOutAccountMock as unknown as Account)
      .onCall(2).resolves(cashOutAccountMock as unknown as Account);
		sinon.stub(transactionRepository, 'create')
      .resolves(transactionReturned as unknown as Transaction);
	});

	after(() => {
		sinon.restore();
	});

	describe('Making a new Transaction', () => {
    it('If the user tries to make a transaction to his own username, should throw a forbidden error',
    async () => {
			try {
			  await transactionService.create(cashOutDataMock, 'Joaozinho', 80);
      } catch (error: any) {
        expect(error.status).to.be.equal(403);
  			expect(error.message).to.be.equal('Cannot make transactions between the same user');
      }
		});

    it('If the cashIn username doesn\'t exists, should throw a bad request error', async () => {
			try {
			  await transactionService.create(cashOutDataMock, 'Invalid User', 80);
      } catch (error: any) {
        expect(error.status).to.be.equal(400);
  			expect(error.message).to.be.equal('Username to receive the cash in doesn\'t exists');
      }
		});

    it('If the user account is not found, should throw an error', async () => {
			try {
			  await transactionService.create(cashOutDataMock, 'Mariazinha', 80);
      } catch (error: any) {
        expect(error).to.throw;
      }
		});

    it('If the user doesn\'t have enough money in account, should throw a forbidden error',
    async () => {
			try {
			  await transactionService.create(cashOutDataMock, 'Mariazinha', 150);
      } catch (error: any) {
        expect(error.status).to.be.equal(403);
  			expect(error.message).to.be.equal('Not enough money in account to make this transaction');
      }
		});

		it('If the transaction is successful, should return the transaction info', async () => {
			const newTransaction = await transactionService.create(cashOutDataMock, 'Mariazinha', 80);
			expect(newTransaction).to.be.deep.equal(transactionReturned);
		});
	});
});