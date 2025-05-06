const express=require('express')
const router=express.Router()
const userTaskController=require('../controllers/userTaskController')
const verifyJWTspeeker=require('../middleware/verifyJWTspeeker')
const verifyJWTuser=require('../middleware/verifyJWTuser')

router.post('/',verifyJWTuser,userTaskController.createUserTask)
router.delete('/',verifyJWTspeeker,userTaskController.deleteUserTask)
router.get('/ByUserAndTask/:user/:task',verifyJWTuser,userTaskController.getUserTaskByUserAndTask)
//??need also check that the speeker is speek in that course of that task??
router.get('/AccordingTask/:task',verifyJWTspeeker,userTaskController.getByTask)
router.get('/AllUserTasksAccordingUser/:user',verifyJWTuser,userTaskController.allUserTasksAccordingUser)
module.exports=router     