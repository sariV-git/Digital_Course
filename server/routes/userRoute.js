const express=require('express')
const router=express.Router()
const userController=require('../controllers/userController')
const verifyJWTmanager=require('../middleware/verifyJWTmanager')
const verifyJWTuser=require('../middleware/verifyJWTuser')


// router.post('/',userController.createUser)
router.put('/',verifyJWTuser,userController.updateUser)
router.get('/',verifyJWTmanager,userController.getAllUsers)
router.get('/byToken',verifyJWTuser,userController.getUserByToken)
router.get('/:_id',verifyJWTmanager,userController.getUserById)
router.delete('/:_id',verifyJWTmanager,userController.deleteUser)
router.get('/byUserName/:username',verifyJWTmanager,userController.getUserByUserName)
module.exports=router
