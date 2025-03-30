const express=require('express')
const router=express.Router()
const verifyJWTmanager=require('../middleware/verifyJWTmanager')
const verifyJWTuser=require('../middleware/verifyJWTuser')
const verifyJWTspeeker=require('../middleware/verifyJWTspeeker')
const taskController=require('../controllers/taskController')

router.post('/',verifyJWTspeeker,taskController.createTask)
router.put('/',verifyJWTspeeker,taskController.updateLesson)
router.delete('/:_id',verifyJWTspeeker,taskController.deleteTask)
router.get('/:_id',verifyJWTuser,taskController.getByIdTask)
router.get('/',verifyJWTuser,taskController.getAlltasks)
router.get('/AccordingLesson/:_id',verifyJWTuser,taskController.getTaskAccordingLesson)

module.exports=router