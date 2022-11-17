import { Router } from 'express';
import transactionFactory from '../factories/transactionFactory';
import authToken from '../middlewares/authToken';

const router = Router();

router.post('/', authToken, (req, res) => transactionFactory().create(req, res));

export default router;