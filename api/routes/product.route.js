import express from 'express'
import { createProduct,updateProduct,deleteProduct,getAllProducts,getProduct,} from '../controllers/product.cont.js';
import { verifyUser, verifyAdmin } from '../util/verifyToken.js'
const router = express.Router();

//CREATE
router.post("/", verifyAdmin, createProduct);

//UPDATE
router.put('/:id', verifyAdmin, updateProduct);


//DELETE
router.delete('/:id', verifyAdmin, deleteProduct);

//GET PRODUCTS 
router.get('/find/:id', getProduct);

// GET ALL PRODUCTS
router.get('/', getAllProducts);

// // GET USER STATUS
// router.get('/stats', verifyAdmin, getStast);
export default router