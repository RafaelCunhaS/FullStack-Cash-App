import LoginController from '../controller/Login.controller';
import UserRepository from '../repository/User.repository';
import LoginService from '../service/Login.service';

export default () => {
  const model = new UserRepository();
  const service = new LoginService(model);
  const controller = new LoginController(service);

  return controller;
};