

const express=require('express')
const router=express.Router()
const verifyJWTuser=require('../middleware/verifyJWTuser')
const verifyJWTmanager=require('../middleware/verifyJWTmanager')

const respondController=require('../controllers/respondController')

router.post('/',verifyJWTuser,respondController.createRespond)
router.put('/',verifyJWTuser,respondController.updateRespond)
router.delete('/:_id',verifyJWTmanager,respondController.deleteRespond)
router.get('/getAccordingIntroduceAndCourse/:course',respondController.getAccordingIntroduce)
router.get('/accordingCourse/:course',verifyJWTmanager,respondController.getAllRespondsAccordingCourse)
router.get('/accordingCourseAndUser/:course_id/:user_id',verifyJWTuser,respondController.getAccordingUserAndCourse)

module.exports=router  