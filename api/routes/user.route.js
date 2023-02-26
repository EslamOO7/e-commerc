import express from 'express'
import { updateUser, deleteUser, getUser, getUsers,getStats } from '../controllers/user.cont.js';
import { verifyUser, verifyAdmin } from '../util/verifyToken.js'
const router = express.Router();

//UPDATE
router.put('/:id', verifyUser, updateUser);


//DELETE
router.delete('/:id', verifyUser, deleteUser);

//GET USER 
router.get('/find/:id', verifyAdmin, getUser);

// GET ALL USERS
router.get('/', verifyAdmin, getUsers);
// GET USER STATUS
router.get('/stats', verifyAdmin, getStats);
export default router
// module.exports = router