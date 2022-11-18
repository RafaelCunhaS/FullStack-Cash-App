import AccountController from '../controller/Account.controller';
import AccountRepository from '../repository/Account.repository';
import UserRepository from '../repository/User.repository';
import AccountService from '../service/Account.service';

export default () => {
  const model = new AccountRepository();
  const userModel = new UserRepository();
  const service = new AccountService(model, userModel);
  const controller = new AccountController(service);

  return controller;
};