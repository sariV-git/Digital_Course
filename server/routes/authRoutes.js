const express=require('express')

const router=express.Router()
const authController=require('../controllers/authController')
router.post('/loginmanager',authController.loginManager)
router.post('/login',authController.login)
router.post('/register',authController.register)
router.post('/registerManager',authController.registerManager)


module.exports=router