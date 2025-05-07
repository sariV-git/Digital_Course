const express = require('express')
const router = express.Router()
const courseController = require('../controllers/courseController')
const verifyJWTmanager = require('../middleware/verifyJWTmanager')
const verifyJWTuser = require('../middleware/verifyJWTuser')
// const verifyJWTuser=require('../middleware/verifyJWTuser')
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/upload/'));
    },
    filename: function (req, file, cb) {

        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        console.log('File uploaded:', uniqueSuffix + file.originalname);
        cb(null, uniqueSuffix + file.originalname)
    }
})

const upload = multer({
    storage: storage,
    limits: { fileSize: 2147483648 }, // 2GB
});

const multerErrorHandler = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        console.error("Multer error:", err); // בדיקת לוג
        if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(413).json({ message: 'File too large. Maximum size is 2GB.' });
        }
    } else if (err) {
        console.error("Unknown error:", err); // טיפול בשגיאות אחרות
        // טיפול בשגיאות אחרות
        return res.status(500).json({ message: 'An unknown error occurred during file upload.' });
        }
        next(err); // אם לא מדובר בשגיאה של multer, תעביר ל-middlewares אחרים
    };

// router.post('/', verifyJWTmanager, upload.fields([{name:'pathTriler',maxCount:1},{name:'backgroundImage',maxCount:1}]), courseController.createCourse)
// router.put('/', verifyJWTmanager, upload.fields([{name:'pathTriler',maxCount:1},{name:'backgroundImage',maxCount:1}]), courseController.updateCourse)
// router.delete('/:_id', verifyJWTmanager, courseController.deleteCourse)
// router.get('/', courseController.getAllCourses)
// router.get(':_id', courseController.getCourse)
// router.get("/getSpeakerInformation/:_id", courseController.getSpeakerInformationByCoursId)
// // router.get('/allLessonsAccordingCourse/:_id', verifyJWTuser, courseController.getAllLessonAccordingCourse)



    // const upload = multer({ storage: storage })

    router.post('/', verifyJWTmanager, upload.fields([{ name: 'pathTriler', maxCount: 1 }, { name: 'backgroundImage', maxCount: 1 }]), multerErrorHandler, courseController.createCourse)
    router.put('/', verifyJWTmanager, upload.fields([{ name: 'pathTriler', maxCount: 1 }, { name: 'backgroundImage', maxCount: 1 }]), multerErrorHandler, courseController.updateCourse)
    router.delete('/:_id', verifyJWTmanager, courseController.deleteCourse)
    router.get('/', courseController.getAllCourses)
    router.get(':_id', courseController.getCourse)
    router.get("/getSpeakerInformation/:_id", courseController.getSpeakerInformationByCoursId)
    router.get('/allLessonsAccordingCourse/:_id', verifyJWTuser, courseController.getAllLessonAccordingCourse)

    module.exports = router
