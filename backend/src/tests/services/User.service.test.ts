import { expect } from 'chai';
import sinon from 'sinon';
import UserRepository from '../../repository/User.repository'
import UserService from '../../service/User.service'
import md5 from 'md5';
import User from '../../database/models/User.model';

describe('UserService class', () => {
  const userRepository = new UserRepository();
	const userService = new UserService(userRepository);

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
		sinon.stub(userRepository, 'getByUsername')
      .onCall(0).resolves(userReturned as unknown as User)
      .onCall(1).resolves(null);
		sinon.stub(userRepository, 'create').resolves(userReturned as unknown as User);
	});

	after(() => {
		sinon.restore();
	});

	describe('Registering a new user', () => {
    it('If the username already registered, should throw a conflict error', async () => {
			try {
			  await userService.create(userMock);
      } catch (error: any) {
        expect(error.status).to.be.equal(409);
  			expect(error.message).to.be.equal('Username already registered');
      }
		});

		it('If the username is unique, should return the user created info', async () => {
			const newUser = await userService.create(userMock);
			expect(newUser).to.be.deep.equal(userReturned);
		});
	});
});