const express=require('express')
const authMiddleware = require('../middlewares/authMiddleware')
const { createInventory, getInventory } = require('../controllers/inventoryController')


const router=express.Router()

router.post('/create-inventory',authMiddleware,createInventory)
router.get('/get-inventory',authMiddleware,getInventory)


module.exports=router