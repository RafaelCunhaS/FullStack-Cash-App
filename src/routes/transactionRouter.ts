import { Router } from 'express';
import transactionFactory from '../factories/transactionFactory';
import authToken from '../middlewares/authToken';
import transactionValidation from '../middlewares/transactionValidation';

const router = Router();

router.post('/', transactionValidation, authToken,
 (req, res) => transactionFactory().create(req, res));

export default router;