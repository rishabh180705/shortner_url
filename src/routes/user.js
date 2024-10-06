import { Router } from "express";
const router=Router();
import {handlerUserSignUp,
    handlerUserlogin} from '../controllers/user.js';

router.post('/',handlerUserSignUp);
router.post('/login',handlerUserlogin);

export default router;