const express=require('express')
const router=express.Router()
const userCourseController=require('../controllers/userCourseController')
const verifyJWTmanager=require('../middleware/verifyJWTmanager')
const verifyJWTuser=require('../middleware/verifyJWTuser')

router.put('/',userCourseController.updateUserCourse)
router.delete('/:_id',verifyJWTmanager,userCourseController.deleteUserCourse)
router.get('/:_id',verifyJWTuser,userCourseController.getByIdUserCourse)
router.get('/',verifyJWTuser,userCourseController.getByIdUserCourse)
router.get('/accordingUser/:_id',verifyJWTuser,userCourseController.getUserCourseAccordingUser)//to send the id of the user
router.get('/getUsersAccordingCourse/:_id',verifyJWTmanager,userCourseController.getUsersAccordingCourse)
module.exports=router