const express=require('express')
const router=express.Router()
const courseController=require('../controllers/courseController')
const verifyJWTmanager=require('../middleware/verifyJWTmanager')
// const verifyJWTuser=require('../middleware/verifyJWTuser')
const multer=require('multer')
const path=require('path')

const storage=multer.diskStorage({
    destination:function(req,file,cb){cb(null,path.join(__dirname,'../public/upload/'));},
    filename:function(req,file,cb){
        const uniqueSuffix=Date.now()+'-'+Math.round(Math.random()*1E9)
        cb(null,uniqueSuffix+file.originalname)}
})

const upload=multer({storage:storage})

router.post('/',verifyJWTmanager,upload.single('pathTriler'),courseController.createCourse)
router.put('/',verifyJWTmanager,upload.single('pathTriler'),courseController.updateCourse)
router.delete('/:_id',verifyJWTmanager,courseController.deleteCourse)
router.get('/',courseController.getAllCourses)
router.get(':_id',courseController.getCourse)
router.get("/getSpeakerInformation/:_id",courseController.getSpeakerInformationByCoursId)


module.exports=router
