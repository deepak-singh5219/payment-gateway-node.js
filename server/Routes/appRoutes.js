import express from 'express';
const router = express.Router();
import {home,payment} from '../controllers/controllers.js';


router.get('/',home);
router.post('/payment',payment);

export default router;