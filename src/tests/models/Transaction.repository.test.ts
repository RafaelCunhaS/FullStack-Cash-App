import { expect } from 'chai';
import sinon from 'sinon';
import TransactionRepository from '../../repository/Transaction.repository'
import db from '../../database/models';
import { Transaction } from 'sequelize';

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

	before(() => {
		sinon.stub(db, 'transaction').resolves(transactionReturned as unknown as Transaction);
	});

	after(() => {
		sinon.restore();
	});

	describe('Making a new transaction', () => {
		it('Should return all the transaction info', async () => {
			const Transaction = await transactionRepository.create(cashOutDataMock, cashInDataMock, 80);
			expect(Transaction).to.be.deep.equal(transactionReturned);
		});
	});
});