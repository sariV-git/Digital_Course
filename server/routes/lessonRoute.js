

const express=require('express')
const router=express.Router()
const multer=require('multer')
const path=require('path')
const verifyJWTmanager=require('../middleware/verifyJWTmanager')
const verifyJWTuser=require('../middleware/verifyJWTuser')
const verifyJWTspeeker=require('../middleware/verifyJWTspeeker')
const lessonController=require('../controllers/lessonController')


const storage=multer.diskStorage({
    destination:function(req,file,cb){cb(null,path.join(__dirname,'../public/upload/'));},
    filename:function(req,file,cb){
        const uniqueSuffix=Date.now()+'-'+Math.round(Math.random()*1E9)
        cb(null,uniqueSuffix+file.originalname)}
})

const upload=multer({storage:storage})
//how can i delete recorder

router.post('/',verifyJWTspeeker,upload.single('path'),lessonController.createLesson)
router.put('/',verifyJWTspeeker,lessonController.updatLesson)
router.delete('/:_id',verifyJWTspeeker,lessonController.deleteLesson)
router.get('/:_id',verifyJWTuser,lessonController.getByIdLesson)
router.get('/',verifyJWTuser,lessonController.getAllLessons)
router.get('/getForUserAccordingCourse/:user/:course',verifyJWTuser,lessonController.getLessonForUserAccordingCourse)
router.get('/getAllLessonsAccordingCourse/:course',verifyJWTspeeker,lessonController.getAllLessonsAccordingCourse)
module.exports=router 