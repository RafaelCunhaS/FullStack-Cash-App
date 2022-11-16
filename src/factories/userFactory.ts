import UserController from '../controller/User.controller';
import UserRepository from '../repository/User.repository';
import UserService from '../service/User.service';

export default () => {
  const model = new UserRepository();
  const service = new UserService(model);
  const controller = new UserController(service);

  return controller;
};