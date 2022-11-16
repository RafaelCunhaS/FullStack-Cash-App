import { Router } from 'express';
import loginFactory from '../factories/loginFactory';
import loginValidation from '../middlewares/loginValidation';

const router = Router();

router.post('/', loginValidation, (req, res) => loginFactory().userLogin(req, res));

export default router;