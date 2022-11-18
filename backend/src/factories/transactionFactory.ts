import TransactionController from '../controller/Transaction.controller';
import AccountRepository from '../repository/Account.repository';
import TransactionRepository from '../repository/Transaction.repository';
import UserRepository from '../repository/User.repository';
import TransactionService from '../service/Transaction.service';

export default () => {
  const model = new TransactionRepository();
  const accountModel = new AccountRepository();
  const userModel = new UserRepository();
  const service = new TransactionService(model, accountModel, userModel);
  const controller = new TransactionController(service);

  return controller;
};