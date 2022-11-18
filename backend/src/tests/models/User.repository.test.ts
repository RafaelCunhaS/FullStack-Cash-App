import { expect } from 'chai';
import sinon from 'sinon';
import UserRepository from '../../repository/User.repository'
import { Model, Transaction } from 'sequelize';
import md5 from 'md5';
import User from '../../database/models/User.model';
import db from '../../database/models';

describe('UserRepository class', () => {
  const userRepository = new UserRepository();

	const userMock = {
		username: 'Joaozinho',
		password: '1234567Z',
	}
	const userReturned = {
		id: 1,
		username: 'Joaozinho',
		password: md5('1234567Z'),
		accountId: 1
	}

	before(() => {
		sinon.stub(db, 'transaction').resolves(userReturned as unknown as Transaction);
		sinon.stub(Model, 'findOne')
			.onCall(0).resolves(userReturned as unknown as User)
			.onCall(1).resolves(null);
	});

	after(() => {
		sinon.restore();
	});

	describe('Registering a new user', () => {
		it('If the user is successfully registered, should return the user info', async () => {
			const newUser = await userRepository.create(userMock);
			expect(newUser).to.be.deep.equal(userReturned);
		});
	});

	describe('Searching for a user by its username', () => {
		it('If the user is successfully found, should return the user info', async () => {
			const user = await userRepository.getByUsername('Jaozinho');
			expect(user).to.be.deep.equal(userReturned);
		});

		it('If the user is not found, should return null', async () => {
			const user = await userRepository.getByUsername('Nome Inválido');
			expect(user).to.be.null;
		});
	});
});