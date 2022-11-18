import { expect } from 'chai';
import sinon from 'sinon';
import AccountRepository from '../../repository/Account.repository'
import AccountService from '../../service/Account.service'
import UserRepository from '../../repository/User.repository'
import Account from '../../database/models/Account.model';
import md5 from 'md5';
import User from '../../database/models/User.model';

describe('AccountService class', () => {
  const accountRepository = new AccountRepository();
  const userRepository = new UserRepository();
	const accountService = new AccountService(accountRepository, userRepository);

	const accountReturned = {
		id: 1,
		balance: 100
	}
  const wrongIdAccount = {
		id: 999,
		balance: 100
	}
  const userReturned = {
		id: 1,
		username: 'Joaozinho',
		password: md5('1234567Z'),
		accountId: 1
	}

	before(() => {
    sinon.stub(userRepository, 'getByUsername')
      .onCall(0).resolves(null)
      .onCall(1).resolves(userReturned as unknown as User)
      .onCall(2).resolves(userReturned as unknown as User)
      .onCall(3).resolves(userReturned as unknown as User);
		sinon.stub(accountRepository, 'getBalance')
      .onCall(0).resolves(null)
      .onCall(1).resolves(wrongIdAccount as unknown as Account)
      .onCall(2).resolves(accountReturned as unknown as Account);
	});

	after(() => {
		sinon.restore();
	});

	describe('Getting an account balance', () => {
    it('If the username is not found, should throw a not found error', async () => {
			try {
			  await accountService.getBalance(1, 'Invalid User');
      } catch (error: any) {
        expect(error.status).to.be.equal(404);
  			expect(error.message).to.be.equal('User not found');
      }
		});

    it('If the account is not found, should throw an error', async () => {
			try {
			  await accountService.getBalance(99999, 'Joaozinho');
      } catch (error: any) {
  			expect(error).to.throw;
      }
		});

		it('If the account id doesn\'t match the user accountId, should throw an unauthorized error', async () => {
			try {
			  await accountService.getBalance(99999, 'Joaozinho');
      } catch (error: any) {
        expect(error.status).to.be.equal(401);
  			expect(error.message).to.be.equal('Account unavailable for user');
      }
		});

    it('If it is successful, should return the account balance info', async () => {
			const account = await accountService.getBalance(1, 'Joaozinho');
			expect(account).to.be.deep.equal(accountReturned);
		});
	});
});