import express from 'express';
import {payment} from "../controllers/payment.js"
//const payment = require('../controllers/payment')
const router = express.Router();



router.post('/payment',payment)



export default router