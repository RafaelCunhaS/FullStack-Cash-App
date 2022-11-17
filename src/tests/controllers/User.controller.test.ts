import { expect } from 'chai';
import * as sinon from 'sinon';
import { Request, Response } from 'express';
import UserController from '../../controller/User.controller';
import UserService from '../../service/User.service';
import UserRepository from '../../repository/User.repository';
import User from '../../database/models/User.model';
import md5 from 'md5';

describe('UserController class', () => {
  const userRepository = new UserRepository()
  const userService = new UserService(userRepository);
  const userController = new UserController(userService);
  const req = {} as Request;
  const res = {} as Response;

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
    sinon.stub(userService, 'create').resolves(userReturned as unknown as User)

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  after(() => {
    sinon.restore()
  })

  describe('Registering a new user', () => {
    it('If the registration is successful, should return a status 201 and a token on its body', async () => {
      req.body = userMock;
      await userController.create(req, res);

      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith()).to.be.not.null;
    });
  });
});