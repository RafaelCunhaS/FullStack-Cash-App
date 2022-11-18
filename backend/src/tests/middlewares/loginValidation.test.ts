import chai from 'chai';
import chaiHttp from 'chai-http';
import { expect } from 'chai';
import { app } from '../../app'

chai.use(chaiHttp);

describe('Login/Register validation', () => {
  describe('If the username have less than 3 characters', async () => {
    let response: any

    before( async () => {
      response = await chai.request(app).post('/user')
        .send({ username: 'Jo', password: '1234567Z' });
    });

    it('Should return the status code 400', () => {
      expect(response).to.have.status(400);
    });
    it('The body should have a error message', () => {
      expect(response.body.message).to.be
        .equal('"username" length must be at least 3 characters long');
    });
  });

  describe('If the password have less than 8 characters', async () => {
    let response: any

    before( async () => {
      response = await chai.request(app).post('/user')
        .send({ username: 'Joaozinho', password: '123456' });
    });

    it('Should return the status code 400', () => {
      expect(response).to.have.status(400);
    });
    it('The body should have a error message', () => {
      expect(response.body.message).to.be
        .equal('"password" length must be at least 8 characters long');
    });
  });

  describe('If the password doesn\'t have at least one digit', async () => {
    let response: any

    before( async () => {
      response = await chai.request(app).post('/user')
        .send({ username: 'Joaozinho', password: 'INVALIDPASS' });
    });

    it('Should return the status code 400', () => {
      expect(response).to.have.status(400);
    });
    it('The body should have a error message', () => {
      expect(response.body.message).to.be
        .equal('"password" with value "INVALIDPASS" fails to match the at least one digit pattern');
    });
  });

  describe('If the password doesn\'t have at least one upper-case letter', async () => {
    let response: any

    before( async () => {
      response = await chai.request(app).post('/user')
        .send({ username: 'Joaozinho', password: '12345678' });
    });

    it('Should return the status code 400', () => {
      expect(response).to.have.status(400);
    });
    it('The body should have a error message', () => {
      expect(response.body.message).to.be
        .equal('"password" with value "12345678" fails to match the at least one upper-case pattern');
    });
  });
});