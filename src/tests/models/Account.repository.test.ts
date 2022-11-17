import { expect } from 'chai';
import sinon from 'sinon';
import AccountRepository from '../../repository/Account.repository'
import { Model } from 'sequelize';
import Account from '../../database/models/Account.model';

describe('AccountRepository class', () => {
  const accountRepository = new AccountRepository();

	const accountReturned = {
		id: 1,
		balance: 100
	}

	before(() => {
		sinon.stub(Model, 'findByPk')
			.onCall(0).resolves(accountReturned as unknown as Account)
			.onCall(1).resolves(null);
	});

	after(() => {
		sinon.restore();
	});

	describe('Searching for a account by its id', () => {
		it('If the account is successfully found, should return the account balance', async () => {
			const account = await accountRepository.getBalance(1);
			expect(account).to.be.deep.equal(accountReturned);
		});

		it('If the Account is not found, should return null', async () => {
			const account = await accountRepository.getBalance(99999);
			expect(account).to.be.null;
		});
	});
});