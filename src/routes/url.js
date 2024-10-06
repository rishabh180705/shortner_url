import { Router } from "express";
import {handlerUrlShortenerGenerator,
    handlerUrlRedirect} from '../controllers/url.js';
const router=Router();


router.route('/').post(handlerUrlShortenerGenerator);
router.route('/analytics/:shortid').get(handlerUrlRedirect);




export default router;