import { expect } from 'chai';
import sinon from 'sinon';
import TransactionRepository from '../../repository/Transaction.repository'
import db from '../../database/models';
import { Transaction } from 'sequelize';
import * as transac from '../../database/models/Transaction.model'

describe('TransactionRepository class', () => {
  const transactionRepository = new TransactionRepository();

  const cashOutDataMock = {
		username: 'Joaozinho',
		accountId: 1
	}
  const cashInDataMock = {
		username: 'Mariazinha',
		accountId: 2
	}
	const transactionReturned = {
    id: 1,
    debitedAccountId: 1,
    creditedAccountId: 2,
    value: 80,
    createdAt: '2022-11-17 14:19:00.996 +00:00'
  }
	const allTransactionsReturn = [{
		id: 1,
		debitedAccountId: 1,
		creditedAccountId: 2,
		value: 80,
		created_at: '2022-11-17 14:19:00.996 +00:00'
	},
	{
		id: 2,
		debitedAccountId: 2,
		creditedAccountId: 1,
		value: 50,
		created_at: '2022-11-18 14:19:00.996 +00:00'
	}]
	const transactionFilteredReturn = [{
		id: 1,
		debitedAccountId: 1,
		creditedAccountId: 2,
		value: 80,
		created_at: '2022-11-17 14:19:00.996 +00:00'
	}]

	before(() => {
		sinon.stub(db, 'transaction').resolves(transactionReturned as unknown as Transaction);
		sinon.stub(transactionRepository, 'getAll')
			.onCall(0).resolves(allTransactionsReturn as unknown as transac.default[])
			.onCall(1).resolves(transactionFilteredReturn as unknown as transac.default[])
	});

	after(() => {
		sinon.restore();
	});

	describe('Making a new transaction', () => {
		it('Should return all the transaction info', async () => {
			const transaction = await transactionRepository.create(cashOutDataMock, cashInDataMock, 80);
			expect(transaction).to.be.deep.equal(transactionReturned);
		});
	});

	describe('Getting all transactions', () => {
		it('Should return all transactions involving the user', async () => {
			const transactions = await transactionRepository.getAll(1, '');
			expect(transactions).to.be.deep.equal(allTransactionsReturn);
		});

		it('If the date filter was passed, should return all transactions filtered by the date',
		async () => {
			const transactions = await transactionRepository.getAll(1, '2022-11-17');
			expect(transactions).to.be.deep.equal(transactionFilteredReturn);
		});
	});
});