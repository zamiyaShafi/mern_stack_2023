const express=require('express')
const { registerController, loginController, getCurrentUser } = require('../controllers/registerController')
const authMiddleware = require('../middlewares/authMiddleware')


const router=express.Router()


router.post('/register',registerController)
router.post('/login',loginController)
router.get('/current-user',authMiddleware,getCurrentUser)


module.exports=router