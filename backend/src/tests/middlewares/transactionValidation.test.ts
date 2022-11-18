import chai from 'chai';
import chaiHttp from 'chai-http';
import { expect } from 'chai';
import { app } from '../../app'

chai.use(chaiHttp);

describe('Transaction validation', () => {
  describe('If no username is passed', async () => {
    let response: any

    before( async () => {
      response = await chai.request(app).post('/transaction').send({ value: 80 });
    });

    it('Should return the status code 400', () => {
      expect(response).to.have.status(400);
    });
    it('The body should have a error message', () => {
      expect(response.body.message).to.be.equal('"username" is required');
    });
  });

  describe('If no value is passed', async () => {
    let response: any

    before( async () => {
      response = await chai.request(app).post('/transaction').send({ username: 'Mariazinha' });
    });

    it('Should return the status code 400', () => {
      expect(response).to.have.status(400);
    });
    it('The body should have a error message', () => {
      expect(response.body.message).to.be.equal('"value" is required');
    });
  });
});