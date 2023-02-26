import express from 'express'
import { createOrder, updateOrder, deleteOrder, getAllOrders, getOrder, getStatsIncome } from '../controllers/order.cont.js';
import { verifyUser, verifyAdmin } from '../util/verifyToken.js'
const router = express.Router();

//CREATE
router.post("/", createOrder);

//UPDATE
router.put('/:id', verifyUser, updateOrder);


//DELETE
router.delete('/:id', verifyAdmin, deleteOrder);

//GET USer Order 
router.get('/find/:id', verifyUser, getOrder);

// GET ALL OrderS
router.get('/', verifyAdmin, getAllOrders);

// GET USER STATUS
router.get('/statsIncome', verifyAdmin, getStatsIncome);


export default router