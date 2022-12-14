import { Router } from 'express';
import accountFactory from '../factories/accountFactory';
import authToken from '../middlewares/authToken';

const router = Router();

router.get('/', authToken, (req, res) => accountFactory().getBalance(req, res));

export default router;