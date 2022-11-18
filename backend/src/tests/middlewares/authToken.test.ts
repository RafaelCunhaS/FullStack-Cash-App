import chai from 'chai';
import chaiHttp from 'chai-http';
import { expect } from 'chai';
import { app } from '../../app'

chai.use(chaiHttp);

describe('Token authorization', () => {
  describe('If no token is passed through authorization headers', async () => {
    let response: any

    before( async () => {
      response = await chai.request(app).get('/account');
    });

    it('Should return the status code 401', () => {
      expect(response).to.have.status(401);
    });
    it('The body should have a error message', () => {
      expect(response.body.message).to.be.equal('Token not found');
    });
  });

  describe('If the password have less than 8 characters', async () => {
    let response: any

    before( async () => {
      response = await chai.request(app).get('/account')
        .set('authorization', 'invalidToken')
    });

    it('Should return the status code 401', () => {
      expect(response).to.have.status(401);
    });
    it('The body should have a error message', () => {
      expect(response.body.message).to.be.equal('Token must be a valid token');
    });
  });
});