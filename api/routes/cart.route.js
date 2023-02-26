import express from 'express'
import { createCart,updateCart,deleteCart,getAllCarts,getCart} from '../controllers/cart.cont.js';
import { verifyUser, verifyAdmin } from '../util/verifyToken.js'
const router = express.Router();

//CREATE
router.post("/", verifyUser, createCart);

//UPDATE
router.put('/:id', verifyUser, updateCart);


//DELETE
router.delete('/:id', verifyUser, deleteCart);

//GET USer CART 
router.get('/find/:id',verifyUser, getCart);

// GET ALL CARTS
router.get('/', verifyAdmin,getAllCarts);

// // GET USER STATUS
// router.get('/stats', verifyAdmin, getStats);
export default router