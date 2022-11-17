import { Router } from 'express';
import transactionFactory from '../factories/transactionFactory';
import authToken from '../middlewares/authToken';
import transactionValidation from '../middlewares/transactionValidation';

const router = Router();

router.post('/', authToken, transactionValidation,
 (req, res) => transactionFactory().create(req, res));

export default router;