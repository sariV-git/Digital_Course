const express=require('express')
const router=express.Router()
const userTaskController=require('../controllers/userTaskController')
const verifyJWTspeeker=require('../middleware/verifyJWTspeeker')
const verifyJWTuser=require('../middleware/verifyJWTuser')

router.post('/',verifyJWTuser,userTaskController.createUserTask)
router.delete('/',verifyJWTspeeker,userTaskController.deleteUserTask)

module.exports=router