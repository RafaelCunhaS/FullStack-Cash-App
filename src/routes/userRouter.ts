import { Router } from 'express';
import userFactory from '../factories/userFactory';
import loginValidation from '../middlewares/loginValidation';

const router = Router();

router.post('/', loginValidation, (req, res) => userFactory().create(req, res));

export default router;